"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
        <div className="flex flex-col justify-center">Главная страница</div>

        <div className="flex flex-col justify-center">
          <Link href={"/login"}>Войти</Link>
        </div>
      </div>
    </div>
  );
}
