import { NextResponse } from "next/server";

// Для POST запросов
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Ваша логика аутентификации
    if (email === "testemail@email.ru" && password === "2222") {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

// Для GET запросов (если нужно)
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
