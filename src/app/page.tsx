"use client";

import jwt from "jsonwebtoken";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const changeDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return
    }

    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== "object") {
      throw new Error("Невалидный токен");
    }
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.log("ERROR", "Токен просрочен")
    }

    // Дополнительные проверки (если нужно)
    if (!decoded.userId || !decoded.email) {
    
      console.log("ERROR", "В токене нет нужных данных")
    }


  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
        <div className="flex flex-col justify-center">Главная страница</div>

        <button onClick={changeDarkMode}>Переключатель темы</button>
      </div>
    </div>
  );
}
