import turso from "@/lib/db";
import { handleDatabaseQuery } from "@/utils/handleDatabaseQuery";
import { CreateClientDataType } from "@/utils/types/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  return handleDatabaseQuery("clients");
}

export async function POST(request: Request) {
  try {
    // 1. Получаем данные из запроса
    const data: CreateClientDataType = await request.json();

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

    // 3. Проверка существующего пользователя

    const existUser = await turso.execute({
      sql: "SELECT * FROM clients WHERE email = ?",
      args: [data.email],
    });
    if (existUser.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Пользователь с таким email уже существует",
        },
        { status: 409 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
      userCompanyKey: string;
    };

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const authorId = decoded?.userId || undefined;
    const userCompanyKey = decoded?.userCompanyKey || undefined;

    if (!authorId || !userCompanyKey) {
      return NextResponse.json(
        { success: false, message: "Ошибка токена, выполните вход снова." },
        { status: 400 }
      );
    }

    const args = [
      data.name,
      data.email,
      data.tel,
      data.website,
      data.comment,
      data.company,
      userCompanyKey,
      authorId,
      createdAt,
      updatedAt,
    ].map((value) => value ?? null);

    // SQL-запрос для создания пользователя
    const result = await turso.execute({
      sql: `
        INSERT INTO clients (
           name, email, phone, website, comment,  company, userCompanyKey,  authorId, created_at, update_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: args,
    });

    if (result) {
      // 5. Возвращаем успешный ответ с токеном
      return NextResponse.json(
        {
          success: true,
          message: "Клиент успешно создан",
          data: {},
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
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
