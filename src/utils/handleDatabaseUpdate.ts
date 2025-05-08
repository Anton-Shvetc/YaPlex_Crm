import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import turso from "@/lib/db";

type EntityUpdateParams<T> = {
  entityName: string;
  requiredFields: (keyof T)[];
  uniqueFields?: (keyof T)[];
  updateQuery: string;
  prepareData: (
    data: T,
    tokenData: { userId: string; userCompanyKey: string },
    id: string
  ) => any[];
  idField?: string;
};

export async function handleDatabaseUpdate<T>(
  request: Request,
  { params }: { params: { id: string } },
  updateParams: EntityUpdateParams<T>
) {
  try {
    // 1. Получаем данные из запроса и ID из параметров URL
    const data = await request.json();
    const { id } = params;

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
    const missingFields = updateParams.requiredFields.filter(
      (field) => !data[field]
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Обязательные поля не заполнены: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // 4. Декодирование токена
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

    const userCompanyKey = decoded.userCompanyKey;
    const idField = updateParams.idField || "id";

    // 5. Проверка существования записи и принадлежности к компании
    const existingEntity = await turso.execute({
      sql: `SELECT * FROM ${updateParams.entityName} WHERE ${idField} = ? AND userCompanyKey = ?`,
      args: [id, userCompanyKey],
    });

    if (existingEntity.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Запись не найдена или у вас нет прав для её изменения",
        },
        { status: 404 }
      );
    }

    // 6. Проверка уникальности полей (если они изменились)
    if (updateParams.uniqueFields) {
      for (const field of updateParams.uniqueFields) {
        if (data[field] !== existingEntity.rows[0][field as string]) {
          const checkResult = await turso.execute({
            sql: `SELECT ${idField} FROM ${updateParams.entityName} WHERE ${String(
              field
            )} = ? AND userCompanyKey = ? AND ${idField} != ?`,
            args: [data[field], userCompanyKey, id],
          });

          if (checkResult.rows.length > 0) {
            return NextResponse.json(
              {
                success: false,
                message: `Запись с таким ${String(
                  field
                )} уже существует в вашей компании`,
              },
              { status: 409 }
            );
          }
        }
      }
    }

    // 7. Подготовка данных и выполнение запроса на обновление
    const args = updateParams.prepareData(data, {
      userId: decoded.userId,
      userCompanyKey,
    }, id);

    const result = await turso.execute({
      sql: updateParams.updateQuery,
      args: args.map((value) => value ?? null),
    });

    return NextResponse.json(
      {
        success: true,
        message: `${updateParams.entityName} успешно обновлен`,
        data: { id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating ${updateParams.entityName}:`, error);
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