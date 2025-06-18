"use client";

import { CollapseIcon, ExpandIcon, UserIcon, LogoutIcon } from "@/styles/icons";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  navigationLinks,
  LogoCloseNavBarMob,
  LogoOpenNavBarMob,
  COMMON_CLASSES,
} from "@/components/navigation/NavigationComponents";
import { logout } from "@/services/auth";

export default function AdaptiveNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsSideMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSideMenuOpen]);

  const handleToggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      router.push("/");
      setIsSideMenuOpen(false);
    }
  };

  const collapseButtonClasses = ` rounded-full p-1 z-10 border-2 hover:bg-gray-300 cursor-pointer
    ${
      mounted
        ? "bg-gray-200 dark:bg-gray-700 border-gray-100 dark:border-gray-800 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
        : "bg-gray-200 border-gray-100"
    }`;

  return (
    <>
      {/* Мобильная верхняя панель навигации - отображается только на мобильных (md:hidden) */}
      <header className="top-0 left-0 right-0 h-[50px] bg-white dark:bg-gray-800 flex items-center justify-between px-4 z-40 shadow-sm rounded-b-xl mb-5 md:hidden">
        {/* Бургер-меню */}
        <button
          onClick={handleToggleSideMenu}
          className="block"
          aria-label="Открыть меню"
        >
          <div className="w-6 h-0.5 bg-gray-800 dark:bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-800 dark:bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-800 dark:bg-white"></div>
        </button>

        <div className="flex justify-center flex-grow">
          <LogoCloseNavBarMob />
        </div>

        <Link href="/profile" className={`block ${COMMON_CLASSES.headerIcon}`}>
          <UserIcon />
        </Link>
      </header>

      {/* Боковая панель навигации для десктопов - всегда видна на десктопах (hidden md:flex) */}
      <div
        className={`hidden md:flex flex-col h-screen bg-[#F9FAFB] dark:bg-gray-800 p-2 transition-all duration-300 ${
          isCollapsed ? "w-[70px]" : "w-64"
        }`}
      >
        <nav className="flex-1 flex flex-col space-y-4 relative">
          {/* Кнопка сворачивания */}
          <div
            className={`w-full flex ${
              isCollapsed ? "justify-center" : "justify-end"
            }`}
          >
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={collapseButtonClasses}
            >
              {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
            </button>
          </div>

          {/* Навигационные ссылки для десктопа */}
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded p-2 ${
                pathname === link.href
                  ? mounted
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "bg-gray-200"
                  : ""
              } ${isCollapsed ? "justify-center" : "px-4"} ${
                mounted
                  ? "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  : "hover:bg-gray-200"
              }`}
              title={isCollapsed ? link.label : undefined}
            >
              {link.icon}
              {!isCollapsed && <span className="ml-3">{link.label}</span>}
            </Link>
          ))}

          <Link
            href="/profile"
            className={`flex items-center rounded p-2 ${
              pathname === "/profile"
                ? mounted
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "bg-gray-200"
                : ""
            } ${isCollapsed ? "justify-center" : "px-4"} ${
              mounted
                ? "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                : "hover:bg-gray-200"
            }`}
            title={isCollapsed ? "Профиль" : undefined}
          >
            <UserIcon />
            {!isCollapsed && <span className="ml-3">Профиль</span>}
          </Link>

          {/* Кнопка выхода для десктопа */}
          <button
            onClick={handleLogout}
            className={`flex items-center rounded p-2 cursor-pointer ${
              isCollapsed ? "justify-center" : "px-4"
            } ${
              mounted
                ? "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                : "hover:bg-gray-200"
            }`}
            title="Выйти"
          >
            <LogoutIcon />
            {!isCollapsed && <span className="ml-3">Выйти</span>}
          </button>
        </nav>
      </div>

      {/* Выдвижное мобильное меню - отображается поверх содержимого при активации */}
      <div
        className={`inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          isSideMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseSideMenu}
      >
        <div
          className={`absolute top-0 left-0 h-full w-full ${
            COMMON_CLASSES.menuBackground
          } transform transition-transform duration-300 ease-in-out ${
            isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center pt-8 px-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <LogoOpenNavBarMob />
            <button
              className="ml-auto text-gray-500 dark:text-gray-400"
              onClick={handleCloseSideMenu}
              aria-label="Закрыть меню"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Навигационные ссылки для мобильного меню */}
          <nav className="px-2 pt-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center rounded-lg py-3 px-4 mb-1 ${
                  pathname === link.href
                    ? "bg-blue-50 dark:bg-gray-700 text-blue-500"
                    : "text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700"
                }`}
              >
                {link.icon}
                <span className="ml-4">{link.label}</span>
              </Link>
            ))}

            {/* Кнопка выхода для мобильного меню */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full rounded-lg py-3 px-4 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 mt-4"
            >
              <LogoutIcon />
              <span className="ml-4">Выйти</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
