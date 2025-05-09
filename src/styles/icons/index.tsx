"use client";

import Image from "next/image";

// Создаем HOC (Higher Order Component) для оборачивания иконок с учетом темной темы
export const withThemeSupport = (IconComponent: React.FC) => {
  return function ThemedIcon() {
    return (
      <div className="w-6 h-6 flex items-center justify-center text-gray-800 dark:text-white">
        <IconComponent />
      </div>
    );
  };
};

// Основные иконки
export const HomeIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center dark:invert">
    <Image src="/home.svg" alt="Главная" width={24} height={24} />
  </div>
);

export const UserIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center dark:invert">
    <Image src="/profile.svg" alt="Профиль" width={24} height={24} />
  </div>
);

export const ClientsIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center dark:invert">
    <Image src="/clients.svg" alt="Клиенты" width={24} height={24} />
  </div>
);

export const DealsIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center dark:invert">
    <Image src="/deals.svg" alt="Сделки" width={24} height={24} />
  </div>
);

export const TasksIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center dark:invert">
    <Image src="/tasks.svg" alt="Задачи" width={24} height={24} />
  </div>
);

export const ReportsIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center dark:invert">
    <Image src="/reports.svg" alt="Отчёты" width={24} height={24} />
  </div>
);

// SVG иконки с поддержкой темы через currentColor
export const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-gray-800 dark:text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  </svg>
);

export const CollapseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-gray-800 dark:text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

export const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-gray-800 dark:text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

export const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 text-gray-600 dark:text-gray-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);
