"use client";
import {
  CollapseIcon,
  ExpandIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
} from "@/styles/icons/icons";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavBar } from "./MobileNavBar";

export default function Navbar() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определение типа устройства
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileNavBar />;
  }

  return (
    <div
      className={`hidden md:flex flex-col h-screen bg-gray-800 p-2 transition-all duration-300 ${
        isCollapsed ? "w-[70px]" : "w-64"
      }`}
    >
      <nav className="flex-1 flex flex-col space-y-4 relative">
        {/* Кнопка сворачивания */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-4 bg-gray-700 rounded-full p-1 z-10 border-2 border-gray-800 hover:bg-gray-600"
        >
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
        </button>

        {/* Навигационные ссылки */}
        <NavLink href="/dashboard" icon={<HomeIcon />} collapsed={isCollapsed}>
          Главная
        </NavLink>
        <NavLink href="/profile" icon={<UserIcon />} collapsed={isCollapsed}>
          Профиль
        </NavLink>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className={`flex items-center text-white hover:bg-gray-700 rounded p-2 ${
            isCollapsed ? "justify-center" : "px-4"
          }`}
          title="Выйти"
        >
          <LogoutIcon />
          {!isCollapsed && <span className="ml-3">Выйти</span>}
        </button>
      </nav>
    </div>
  );
}

// Компонент для навигационных ссылок
function NavLink({
  href,
  icon,
  children,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center text-white hover:bg-gray-700 rounded p-2 ${
        isActive ? "bg-gray-700" : ""
      } ${collapsed ? "justify-center" : "px-4"}`}
      title={undefined}
    >
      {icon}
      {!collapsed && <span className="ml-3">{children}</span>}
    </Link>
  );
}
