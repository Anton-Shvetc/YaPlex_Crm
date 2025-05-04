import { NextResponse } from "next/server";
import turso from "@/lib/db";

export async function handleDatabaseQuery(tableName: string) {
  try {
    const { rows } = await turso.execute(`SELECT * FROM ${tableName}`);

    return NextResponse.json(
      { success: false, message: `Успешно`, data: rows },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
