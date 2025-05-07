import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import turso from "@/lib/db";
import { Client } from "@/utils/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Получаем данные из запроса и ID из параметров URL
    const data: Client = await request.json();
    const { id } = params;

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Токен не найден или устарел, выполните вход снова.",
        },
        { status: 401 }
      );
    }

    // 2. Валидация данных
    if (!data.name) {
      return NextResponse.json(
        { success: false, message: "Обязательные поля не заполнены" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
      userCompanyKey: string;
    };

    const updatedAt = new Date().toISOString();
    const userCompanyKey = decoded?.userCompanyKey;

    if (!userCompanyKey) {
      return NextResponse.json(
        { success: false, message: "Ошибка токена, выполните вход снова." },
        { status: 400 }
      );
    }

    // 3. Проверка существования клиента и принадлежности к компании
    const existingClient = await turso.execute({
      sql: "SELECT * FROM clients WHERE id = ? AND userCompanyKey = ?",
      args: [id, userCompanyKey],
    });

    if (existingClient.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Клиент не найден или у вас нет прав для его изменения",
        },
        { status: 404 }
      );
    }

    // 4. Проверка email на уникальность (если email изменен)
    if (data.email && data.email !== existingClient.rows[0].email) {
      const emailCheck = await turso.execute({
        sql: "SELECT id FROM clients WHERE email = ? AND userCompanyKey = ? AND id != ?",
        args: [data.email, userCompanyKey, id],
      });

      if (emailCheck.rows.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Пользователь с таким email уже существует в вашей компании",
          },
          { status: 409 }
        );
      }
    }

    // 5. Обновление данных клиента
    const result = await turso.execute({
      sql: `
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
      args: [
        data.name,
        data.email ?? null,
        data.phone ?? null,
        data.website ?? null,
        data.comment ?? null,
        data.company ?? null,
        updatedAt,
        id, // Используем ID из параметров URL
        userCompanyKey,
      ],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Данные клиента успешно обновлены",
        data: { id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update client error:", error);
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
