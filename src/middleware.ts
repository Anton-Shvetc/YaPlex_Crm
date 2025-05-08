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

  const publicPaths = ["/login", "/register"];

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
