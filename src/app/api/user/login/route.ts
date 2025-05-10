import turso from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

// Для POST запросов
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Проверяем наличие email и пароля
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    // 2. Ищем пользователя в базе
    const userResult = await turso.execute({
      sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
      args: [email],
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const user = userResult.rows[0] as unknown as {
      userId: string;
      firstName: string;
      lastName: string;
      userName: string;
      phone: string;
      email: string;
      createdAt: string;
      updatedAt: string;

      avatar: string;
      password: string;
      userCompanyKey: string;
    };

    // 3. Сравниваем пароли

    const isPasswordValid =
      (await bcrypt.compare(password, user.password)) ||
      password === user.password;
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Неверный пароль" },
        { status: 401 }
      );
    }

    // 4. Генерируем JWT токен
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        userCompanyKey: user.userCompanyKey,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // 5. Возвращаем успешный ответ с токеном

    (
      await // localStorage.setItem("token", data.token);
      cookies()
    ).set("token", token, {
      httpOnly: true, // Защита от XSS
      secure: process.env.NODE_ENV === "production", // HTTPS-only в продакшене
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: "/", // Доступно на всех путях
    });

    return NextResponse.json({
      success: true,
      message: "Аутентификация успешна",
      data: {
        token,
        userData: user,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка сервера",
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 }
    );
  }
}

// Для GET запросов (если нужно)
// export async function GET() {
//   try {
//     const { rows } = await turso.execute("SELECT * FROM users");

//     return NextResponse.json(
//       { success: false, message: `Успешно`, data: rows },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//   }

//   return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
// }
