import { NextResponse } from "next/server";
import turso from "@/lib/db";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  userCompanyKey: string;
}

export async function handleDatabaseQuery(
  tableName: string,
  limit?: number
) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token)
      return NextResponse.json(
        {
          success: false,
          message:
            "Токен не действительный или устарел, выполните авторизацию снова",
        },
        { status: 401 }
      );

    // 3. Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // 4. Извлекаем нужные данные
    const { userCompanyKey } = decoded;

    let sql = `SELECT * FROM ${tableName} WHERE userCompanyKey = ?`;

    const args = [userCompanyKey];

    if (limit) {
      sql += ` LIMIT ?`;
      args.push(limit.toString());
    }

    const { rows } = await turso.execute({
      sql: sql,
      args: args
    });

    return NextResponse.json(
      { success: false, message: `Успешно`, data: rows },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
