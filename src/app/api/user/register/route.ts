// app/api/register/route.ts
import turso from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RegisterFormDataType } from "@/utils/types";

export async function POST(request: Request) {
  try {
    // 1. Получаем данные из запроса
    const data: RegisterFormDataType = await request.json();

    // 2. Валидация данных
    if (!data.email || !data.password || !data.username) {
      return NextResponse.json(
        { success: false, message: "Обязательные поля не заполнены" },
        { status: 400 }
      );
    }

    // 3. Проверка существующего пользователя

    const existUser = await turso.execute({
      sql: "SELECT * FROM users WHERE email = ? AND is_active != 0",
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

    // 4. Хеширование пароля
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    // SQL-запрос для создания пользователя
    const result = await turso.execute({
      sql: `
        INSERT INTO users (
          userId, firstName, lastName, email, username, userCompanyKey,  password, createdAt, updatedAt, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        userId,
        data.firstName,
        data.lastName,
        data.email,
        data.username,
        data.userCompanyKey,
        hashedPassword,
        createdAt,
        updatedAt,
        1,
      ],
    });

    if (result) {
      const token = jwt.sign(
        {
          userId: userId,
          email: data.email,
          userCompanyKey: data.userCompanyKey,
        },

        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      (
        await // localStorage.setItem("token", data.token);
        cookies()
      ).set("token", token, {
        httpOnly: true, // Защита от XSS
        secure: process.env.NODE_ENV === "production", // HTTPS-only в продакшене
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        path: "/", // Доступно на всех путях
      });

      // 5. Возвращаем успешный ответ с токеном
      return NextResponse.json(
        {
          success: true,
          message: "Регистрация прошла успешно",
          data: {
            token,
            user: {
              id: userId,
              email: data.email,
            },
          },
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
