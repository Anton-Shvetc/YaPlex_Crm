import { NextResponse } from "next/server";
import turso from "@/lib/db";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  userCompanyKey: string;
}

export async function handleDatabaseQuery(tableName: string, limit?: number) {
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userCompanyKey } = decoded;

    let sql = `SELECT * FROM ${tableName} WHERE userCompanyKey = ?`;
    let args = [userCompanyKey];

    if (tableName === "clients") {
      sql = `
        SELECT 
          c.*,
          (SELECT COUNT(*) FROM deals d WHERE d.clientId = c.id AND d.userCompanyKey = ?) as dealsCount
        FROM clients c
        WHERE c.userCompanyKey = ?
      `;
      args = [userCompanyKey, userCompanyKey]; // Два параметра для подзапроса
    }

    if (limit) {
      sql += ` LIMIT ?`;
      args.push(limit.toString());
    }

    const { rows } = await turso.execute({
      sql: sql,
      args: args,
    });

    return NextResponse.json(
      {
        success: true, // Исправлено с false на true
        message: "Успешно",
        data:
          tableName === "clients"
            ? rows.map((row) => ({
                ...row,
                dealsCount: row.dealsCount || 0,
              }))
            : rows,
      },
      { status: 200 }
    );
  } catch (error) {

    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      (await cookies()).delete("token");
      return NextResponse.json(
        {
          success: false,
          message:
            "Токен не действительный или устарел, выполните авторизацию снова",
          error: "Token expired",
 
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" }, // Улучшенное сообщение об ошибке
      { status: 500 }
    );
  }
}
