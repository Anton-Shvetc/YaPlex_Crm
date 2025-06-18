import { Client, DecodedToken } from "@/utils/types";
import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";
import { NextRequest, NextResponse } from "next/server";
import turso from "@/lib/db";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  return handleDatabaseUpdate<Client>(request, id, {
    entityName: "clients",
    requiredFields: ["name", "email", "company"],
    uniqueFields: ["email", "company"],
    chechIsActive: true,
    updateQuery: `
      UPDATE clients SET
        name = ?,
        email = ?,
        phone = ?,
        website = ?,
        comment = ?,
        company = ?,
        update_at = ?
      WHERE id = ? AND userCompanyKey = ?
    `,
    prepareData: (data: Client, { userCompanyKey }, id) => [
      data.name,
      data.email ?? null,
      data.phone ?? null,
      data.website ?? null,
      data.comment ?? null,
      data.company ?? null,
      new Date().toISOString(),
      id,
      userCompanyKey,
    ],
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    // 1. Проверка авторизации
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Токен недействительный или устарел" },
        { status: 401 }
      );
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userCompanyKey } = decoded;

    // 3. Проверка существования клиента
    const existingClient = await turso.execute({
      sql: "SELECT id FROM clients WHERE id = ? AND userCompanyKey = ?",
      args: [id, userCompanyKey],
    });

    if (existingClient.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Клиент не найден или нет прав доступа" },
        { status: 404 }
      );
    }

    // 4. "Мягкое" удаление (установка is_active = false)
    const result = await turso.execute({
      sql: `
        UPDATE clients 
        SET 
          is_active = FALSE,
          update_at = CURRENT_TIMESTAMP
        WHERE id = ? AND userCompanyKey = ?
      `,
      args: [id, userCompanyKey],
    });

    // 5. Проверка результата
    if (result.rowsAffected > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Клиент успешно деактивирован",
          data: { id },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Не удалось деактивировать клиента" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deactivating client:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
