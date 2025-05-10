import { DecodedToken } from "@/utils/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import turso from "@/lib/db";

import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // 1. Проверка авторизации
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Требуется авторизация",
          status: 401,
        },
        { status: 401 }
      );
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userId, userCompanyKey } = decoded;

    // 3. Получение данных пользователя
    const result = await turso.execute({
      sql: `
          SELECT 
            userId, 
            lastname,
            firstname,
            username,
            email,
            is_active
          FROM users 
          WHERE 
            userId = ? 
            AND userCompanyKey = ?
            AND is_active = 1
        `,
      args: [userId, userCompanyKey],
    });

    // 4. Проверка результата
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Пользователь не найден или нет прав доступа",
        },
        { status: 403 }
      );
    }

    // 5. Возвращаем данные пользователя
    const user = result.rows[0];
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);

    // Обработка ошибки верификации JWT
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        {
          success: false,
          message: "Недействительный токен",
        },
        { status: 401 }
      );
    }

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
// export async function POST() {

// }

export async function DELETE() {
  try {
    // 1. Проверка авторизации
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      (await cookies()).delete("token");
      return NextResponse.json(
        {
          success: false,
          message: "Токен недействительный или устарел",
        },
        { status: 401 }
      );
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userId, userCompanyKey } = decoded;

    // 3. Проверка существования клиента
    const existingClient = await turso.execute({
      sql: "SELECT id FROM clients WHERE userId = ? AND userCompanyKey = ? AND is_active != 1",
      args: [userId, userCompanyKey],
    });

    if (existingClient.rows.length === 0) {
      (await cookies()).delete("token");
      return NextResponse.json(
        {
          success: false,
          message: "Аккаунт не найден или нет прав доступа",
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
      args: [userId, userCompanyKey],
    });

    // 5. Проверка результата
    if (result.rowsAffected > 0) {
      (await cookies()).delete("token");

      return NextResponse.json(
        {
          success: true,
          message: "Аккаунт успешно деактивирован",
          data: { userId },
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
