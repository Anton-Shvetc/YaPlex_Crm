import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import turso from "@/lib/db";

type EntityOperationParams<T> = {
  entityName: string;
  requiredFields: (keyof T)[];
  uniqueFields?: (keyof T)[];
  chechIsActive: boolean;
  insertQuery: string;
  prepareData: (
    data: T,
    tokenData: { userId: string; userCompanyKey: string }
  ) => Array<string | number | undefined>;
};

export async function handleDatabaseCreate<T>(
  request: NextRequest,
  params: EntityOperationParams<T>
) {
  try {
    // 1. Получаем данные из запроса
    const data = await request.json();

    // 2. Проверка авторизации
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Токен не найден или устарел" },
        { status: 401 }
      );
    }

    // 3. Валидация обязательных полей
    const missingFields = params.requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Обязательные поля не заполнены: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // 4. Проверка уникальности полей
    if (params.uniqueFields) {
      for (const field of params.uniqueFields) {
        let sql = `SELECT * FROM ${params.entityName} WHERE ${String(
          field
        )} = ?`;

        const args = [data[field]];

        if (params.chechIsActive) {
          args.push(0);
          sql += ` AND is_active = ?`;
        }

        const checkResult = await turso.execute({
          sql: sql,
          args: args,
        });

        if (checkResult.rows.length > 0) {
          return NextResponse.json(
            {
              success: false,
              message: `Запись с таким ${String(field)} уже существует`,
            },
            { status: 409 }
          );
        }
      }
    }

    // 5. Декодирование токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      userCompanyKey: string;
    };

    if (!decoded.userId || !decoded.userCompanyKey) {
      return NextResponse.json(
        { success: false, message: "Ошибка токена" },
        { status: 400 }
      );
    }

    // 6. Подготовка данных и выполнение запроса
    const args = params.prepareData(data, {
      userId: decoded.userId,
      userCompanyKey: decoded.userCompanyKey,
    });

    const result = await turso.execute({
      sql: params.insertQuery,
      args: args.map((value) => value ?? null),
    });

    if (result) {
      return NextResponse.json(
        {
          success: true,
          message: `${params.entityName} успешно создан`,
          data: {},
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(`Error creating ${params.entityName}:`, error);
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