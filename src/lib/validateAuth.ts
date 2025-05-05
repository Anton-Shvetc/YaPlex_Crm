// lib/auth.ts
import { cookies } from "next/headers";
// import { redirect } from 'next/navigation';

// Тип пользователя (замените на свой)
// type User = {
//   id: string;
//   email: string;
// };

// Проверяем, авторизован ли пользователь
export async function validateAuth(): Promise<boolean | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth-token")?.value; // Или 'session-token'

  if (!token) {
    return null; // Нет токена → не авторизован
  }

  try {
    // Здесь проверка токена (JWT, запрос к API и т.д.)
    // const res = await fetch('https://api.example.com/validate', {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // if (!res.ok) throw new Error('Invalid token');

    // const user: User = await res.json();
    return true;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
