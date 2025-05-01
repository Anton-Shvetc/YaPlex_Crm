"use client";

import InputFieldUi from "@/components/ui/InputFieldUi";
import Link from "next/link";

export default function Home() {
  const changeDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
        <div className="flex flex-col justify-center">Главная страница</div>

        <div className="flex flex-col bg-primary bg-white dark:bg-black">
          <Link href={"/login"}>Войти</Link>
        </div>

   

     

        <button onClick={changeDarkMode}>Переключатель темы</button>
      </div>
      <div className="flex flex-col">
        <InputFieldUi
          label="Email"
          type="email"
          placeholder="example@mail.com"
          error="Некорректный email"
        />

        <InputFieldUi label="Пароль" type="password" className="mt-4" />

        <InputFieldUi
          label="Комментарий"
          type="text"
          className="mt-4"
          helpText="Не более 500 символов"
        />

        </div>
    </div>
  );
}
