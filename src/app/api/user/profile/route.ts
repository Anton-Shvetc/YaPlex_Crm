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
export async function PUT(request: NextRequest) {
  try {
    // 1. Проверка авторизации
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Требуется авторизация" },
        { status: 401 }
      );
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userId, userCompanyKey } = decoded;

    // 3. Парсинг тела запроса
    const data = await request.json();

    // 4. Проверка уникальности email (если email изменяется)
    if (data.email) {
      const emailCheck = await turso.execute({
        sql: `
            SELECT userId FROM users 
            WHERE email = ? 
              AND userId != ? 
              AND userCompanyKey = ? 
              AND is_active = 1
          `,
        args: [data.email, userId, userCompanyKey],
      });

      if (emailCheck.rows.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Пользователь с таким email уже существует",
          },
          { status: 409 }
        );
      }
    }

    // 5. Подготовка данных для обновления
    const updateFields = [
      data.firstName?.trim(),
      data.lastName?.trim(),
      data.email?.trim(),
      data.username?.trim(),
    ];

    // 6. Выполняем обновление
    const result = await turso.execute({
      sql: `
          UPDATE users SET
            firstName = ?,
            lastName = ?,
            email = ?,
            username = ?
          WHERE userId = ? AND userCompanyKey = ?
        `,
      args: [...updateFields, userId, userCompanyKey],
    });

    // 7. Проверяем результат
    if (result.rowsAffected === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Пользователь не найден или данные не изменились",
        },
        { status: 400 }
      );
    }

    // 8. Получаем обновленные данные пользователя
    const updatedUser = await turso.execute({
      sql: `
          SELECT 
            userId, 
            firstName,
            lastName,
            username,
            email,
            is_active
          FROM users 
          WHERE userId = ? AND userCompanyKey = ?
        `,
      args: [userId, userCompanyKey],
    });

    // 9. Возвращаем успешный ответ с обновленными данными
    return NextResponse.json(
      {
        success: true,
        message: "Данные успешно обновлены",
        data: updatedUser.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { success: false, message: "Недействительный токен" },
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
          is_active = 0,
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
