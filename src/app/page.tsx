"use client";

import { useRouter } from "next/navigation";
// import { enqueueSnackbar } from "notistack";

// import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Временная функция, удалить после тестов
  const exitUser = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center text-gray-800 dark:text-white text-xl font-semibold">Главная страница</div>
        <button onClick={exitUser} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Выход
        </button>
      </div>
    </div>
  );
}
