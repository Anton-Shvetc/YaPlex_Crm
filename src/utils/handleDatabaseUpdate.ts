import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import turso from "@/lib/db";

type EntityUpdateParams<T> = {
  entityName: string;
  requiredFields: (keyof T)[];
  uniqueFields?: (keyof T)[];
  updateQuery: string;
  chechIsActive?: boolean;
  prepareData: (
    data: T,
    tokenData: { userId: string; userCompanyKey: string },
    id: string
  ) => Array<string | number | undefined | null>;
  idField?: string;
};

interface DecodedToken {
  userId: string;
  userCompanyKey: string;
}

export async function handleDatabaseUpdate<T>(
  request: NextRequest,
  id: string,
  updateParams: EntityUpdateParams<T>
) {
  try {
    // 1. Получаем данные из запроса и ID из параметров URL
    const data = await request.json();
    // const { id } = params;

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
          message: `Обязательные поля не заполнены: ${missingFields.join(
            ", "
          )}`,
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

    // 6. Проверка уникальности полей
    if (updateParams.uniqueFields && updateParams.uniqueFields.length > 0) {
      for (const field of updateParams.uniqueFields) {
        const fieldName = String(field);
        const newValue = data[fieldName];

        // Проверяем только если значение изменилось и новое значение не пустое
        if (newValue !== undefined && newValue !== null && newValue !== "") {
          try {
            let checkQuery = `
        SELECT ${idField} 
        FROM ${updateParams.entityName} 
        WHERE ${fieldName} = ? 
          AND userCompanyKey = ? 
          AND ${idField} != ?
          AND ${fieldName} IS NOT NULL
      `;

            const args = [newValue, userCompanyKey, id];

            if (updateParams.entityName === "clients") {
              checkQuery += ` AND is_active != ?`;
              args.push(0);
            }

            const checkResult = await turso.execute({
              sql: checkQuery,
              args: args,
            });

            if (checkResult.rows.length > 0) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Запись с ${fieldName} "${newValue}" уже существует`,
                  field: fieldName,
                  value: newValue,
                },
                { status: 409 }
              );
            }
          } catch (error) {
            console.error(`Error checking unique field ${fieldName}:`, error);
            return NextResponse.json(
              {
                success: false,
                message: `Ошибка при проверке уникальности поля ${fieldName}`,
              },
              { status: 500 }
            );
          }
        }
      }
    }

    // 7. Подготовка данных и выполнение запроса на обновление

    const sql = updateParams.updateQuery;
    let args = updateParams.prepareData(
      data,
      {
        userId: decoded.userId,
        userCompanyKey,
      },
      id
    );

    // Добавление текущей даты и времени для поля finish_at в случае завершения сделки
    if (updateParams.entityName === "deals") {
      if (data?.status === "Завершена" && !data?.finish_at) {
        data.finish_at = new Date().toISOString();
      }
      if (data?.status !== "Завершена" && data?.finish_at) {
        data.finish_at = null;
      }

      args = updateParams.prepareData(
        data,
        {
          userId: decoded.userId,
          userCompanyKey,
        },
        id
      );

    }

    const result = await turso.execute({
      sql: sql,
      args: args.map((value) => value ?? null),
    });

    if (result) {
      return NextResponse.json(
        {
          success: true,
          message: `${updateParams.entityName} успешно обновлен`,
          data: { id },
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Неизвестная ошибка`,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error(`Error updating ${updateParams.entityName}:`, error);
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
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // 1. Проверка авторизации
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Токен недействительный или устарел" },
        { status: 401 }
      );
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userCompanyKey } = decoded;

    // 3. Проверка существования клиента
    const existingClient = await turso.execute({
      sql: "SELECT id FROM clients WHERE id = ? AND userCompanyKey = ?",
      args: [id, userCompanyKey],
    });

    if (existingClient.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Клиент не найден или нет прав доступа" },
        { status: 404 }
      );
    }

    // 4. "Мягкое" удаление (установка is_active = false)
    const result = await turso.execute({
      sql: `
        UPDATE clients 
        SET 
          is_active = FALSE,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND userCompanyKey = ?
      `,
      args: [id, userCompanyKey],
    });

    // 5. Проверка результата
    if (result.rowsAffected > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Клиент успешно деактивирован",
          data: { id },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Не удалось деактивировать клиента" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deactivating client:", error);
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
