import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import turso from "@/lib/db";

interface DecodedToken {
  userCompanyKey: string;
}

interface StatItem {
  name: string;
  on_today: number;
  today: number;
  week: number;
  month: number;
  quarter: number;
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Токен не действительный или устарел" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userCompanyKey } = decoded;

    // Функция для получения статистики по таблице
    const getTableStats = async (
      tableName: string,
      displayName: string
    ): Promise<StatItem> => {
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      const weekStart = new Date(now.setDate(now.getDate() - 7)).toISOString();
      const monthStart = new Date(
        now.setMonth(now.getMonth() - 1)
      ).toISOString();
      const quarterStart = new Date(
        now.setMonth(now.getMonth() - 3)
      ).toISOString();

      let queries = [
        // Всего записей
        `SELECT COUNT(*) as total FROM ${tableName} WHERE userCompanyKey = ?`,
        // За сегодня
        `SELECT COUNT(*) as count FROM ${tableName} WHERE userCompanyKey = ? AND created_at >= ?`,
        // За неделю
        `SELECT COUNT(*) as count FROM ${tableName} WHERE userCompanyKey = ? AND created_at >= ?`,
        // За месяц
        `SELECT COUNT(*) as count FROM ${tableName} WHERE userCompanyKey = ? AND created_at >= ?`,
        // За квартал
        `SELECT COUNT(*) as count FROM ${tableName} WHERE userCompanyKey = ? AND created_at >= ?`,
      ];

      // Дополнительные условия для таблицы deals
      if (tableName === "deals") {
        if (displayName === "Активные сделки") {
          queries = queries.map((q) =>
            q.replace(
              "WHERE",
              'WHERE (status != "Завершена" AND status != "Отменена") AND'
            )
          );
        } else if (displayName === "Завершенные сделки") {
          queries = queries.map((q) =>
            q.replace(
              "WHERE",
              'WHERE (status = "Завершена" OR status = "Отменена") AND'
            )
          );
        }
      }

      const args = [
        [userCompanyKey],
        [userCompanyKey, todayStart],
        [userCompanyKey, weekStart],
        [userCompanyKey, monthStart],
        [userCompanyKey, quarterStart],
      ];

      const results = await Promise.all(
        queries.map((sql, i) => turso.execute({ sql, args: args[i] }))
      );

      return {
        name: displayName,
        on_today: results[0].rows[0].total as number,
        today: results[1].rows[0].count as number,
        week: results[2].rows[0].count as number,
        month: results[3].rows[0].count as number,
        quarter: results[4].rows[0].count as number,
      };
    };

    // Получаем статистику для всех таблиц параллельно
    const [clientsStats, tasksStats] = await Promise.all([
      getTableStats("clients", "Клиенты"),
      getTableStats("deals", "Сделки"),
    ]);

    // Добавляем разделение сделок на активные и завершенные
    const activeDealsStats = await getTableStats("deals", "Активные сделки");
    const completedDealsStats = await getTableStats(
      "deals",
      "Завершенные сделки"
    );

    const statsData = [
      clientsStats,
      tasksStats,
      activeDealsStats,
      completedDealsStats,
    ];

    return NextResponse.json(
      { success: true, data: statsData },
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
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
