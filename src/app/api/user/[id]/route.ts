import { DecodedToken } from "@/utils/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import turso from "@/lib/db";

import jwt from "jsonwebtoken";

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
      (await cookies()).delete("token");
      return NextResponse.json(
        {
          success: false,
          message: "Токен недействительный или устарел",
          status: 401,
        },
        { status: 401 }
      );
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userCompanyKey } = decoded;

    // 3. Проверка существования клиента
    const existingClient = await turso.execute({
      sql: "SELECT id FROM clients WHERE userId = ? AND userCompanyKey = ? AND is_active != 1",
      args: [id, userCompanyKey],
    });

    if (existingClient.rows.length === 0) {
      (await cookies()).delete("token");
      return NextResponse.json(
        {
          success: false,
          message: "Аккаунт не найден или нет прав доступа",
          status: 403,
        },
        { status: 403 }
      );
    }

    // 4. "Мягкое" удаление (установка is_active = false)
    const result = await turso.execute({
      sql: `
        UPDATE users 
        SET 
          is_active = FALSE,
          update_at = CURRENT_TIMESTAMP
        WHERE userId = ? AND userCompanyKey = ?
      `,
      args: [id, userCompanyKey],
    });

    // 5. Проверка результата
    if (result.rowsAffected > 0) {
      (await cookies()).delete("token");

      return NextResponse.json(
        {
          success: true,
          message: "Аккаунт успешно деактивирован",
          data: { id },
          status: 200,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Не удалось деактивировать аккаунт" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deactivating acc:", error);
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
