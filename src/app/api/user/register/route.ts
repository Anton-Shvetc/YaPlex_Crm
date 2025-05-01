// app/api/register/route.ts
import { NextResponse } from "next/server";



export type RegisterFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

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
    // const existingUser = await db.user.findUnique({
    //   where: { email: data.email }
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { success: false, message: "Пользователь с таким email уже существует" },
    //     { status: 409 }
    //   );
    // }

    // 4. Хеширование пароля
    // const hashedPassword = await bcrypt.hash(data.password, 10);

    // 5. Создание пользователя в базе данных
    // const newUser = await db.user.create({
    //   data: {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     username: data.username,
    //     password: hashedPassword,
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     username: true,
    //     firstName: true,
    //     lastName: true,
    //   }
    // });

    // 6. Возвращаем успешный ответ
    // return NextResponse.json(
    //   { 
    //     success: true, 
    //     message: "Регистрация прошла успешно",
    //     user: newUser
    //   },
    //   { status: 201 }
    // );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}