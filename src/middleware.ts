import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || // Next.js внутренние файлы
    pathname.startsWith("/__next") || // Альтернативный префикс
    pathname.includes("[[...]]") || // Динамические роуты
    pathname.includes("[[") || // Динамические сегменты
    pathname.includes("]]") ||
    pathname.includes(".") || // Файлы с расширениями (.js, .css)
    pathname.startsWith("/api") || // API роуты
    pathname.includes("turbopack") // Turbopack файлы
  ) {
    return NextResponse.next();
  }

  // Пути, не требующие авторизации
  const publicPaths = ["/login", "/register"];

  // Для отладки - можно посмотреть в терминале сервера
  console.log("Middleware triggered:", {
    path: pathname,
    hasToken: !!token,
  });


  // Если нет токена и путь не публичный
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  // Если есть токен и пользователь на странице входа - редирект на главную
  if (token && pathname === "/login") {
    console.log("Redirecting to dashboard - already logged in");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
