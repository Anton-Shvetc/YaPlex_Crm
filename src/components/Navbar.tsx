"use client";
import {
  CollapseIcon,
  ExpandIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
  ClientsIcon,
  DealsIcon,
  TasksIcon,
} from "@/styles/icons";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavBar } from "./MobileNavBar";
import { ThemeToggle } from "./ThemeToggle";
import { logout } from "@/services/auth";
import { useClientStore } from "@/store/clientStore";
import { useStatisticsStore } from "@/store/statisticsStore";
import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";

export default function Navbar() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const collapseButtonClasses = `absolute -right-3 top-4 rounded-full p-1 z-10 border-2 hover:bg-gray-300 
    ${
      mounted
        ? "bg-gray-200 dark:bg-gray-700 border-gray-100 dark:border-gray-800 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
        : "bg-gray-200 border-gray-100"
    }`;

  return (
    <div
      className={`hidden md:flex flex-col h-screen bg-gray-100 dark:bg-gray-800 p-2 transition-all duration-300 ${
        isCollapsed ? "w-[70px]" : "w-64"
      }`}
    >
      <nav className="flex-1 flex flex-col space-y-4 relative">
        {/* Кнопка сворачивания */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={collapseButtonClasses}
        >
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
        </button>

        {/* Навигационные ссылки */}
        <NavLink
          href="/"
          icon={<HomeIcon />}
          collapsed={isCollapsed}
          mounted={mounted}
        >
          Главная
        </NavLink>

        {/* Новые разделы */}
        <NavLink
          href="/clients"
          icon={<ClientsIcon />}
          collapsed={isCollapsed}
          mounted={mounted}
        >
          Клиенты
        </NavLink>
        <NavLink
          href="/deals"
          icon={<DealsIcon />}
          collapsed={isCollapsed}
          mounted={mounted}
        >
          Сделки
        </NavLink>
        <NavLink
          href="/tasks"
          icon={<TasksIcon />}
          collapsed={isCollapsed}
          mounted={mounted}
        >
          Задачи
        </NavLink>

        <NavLink
          href="/profile"
          icon={<UserIcon />}
          collapsed={isCollapsed}
          mounted={mounted}
        >
          Профиль
        </NavLink>

        {/* Переключатель темы - только на клиенте */}
        {mounted && (
          <div className={`flex ${isCollapsed ? "hidden" : "px-4"} mt-auto`}>
            <ThemeToggle />
          </div>
        )}

        <LogoutButton
          isCollapsed={isCollapsed}
          mounted={mounted}
          router={router}
        />
      </nav>
    </div>
  );
}

function LogoutButton({
  isCollapsed,
  mounted,
  router,
}: {
  isCollapsed: boolean;
  mounted: boolean;
  router: ReturnType<typeof useRouter>;
}) {
  const { setClients } = useClientStore();
  const { setDeals } = useDealsStore();
  const { setTasks } = useTasksStore();
  const { setStatisticsTableData } = useStatisticsStore();
  const handleLogout = async () => {
    const { success } = await logout();

    if (success) {
      // Вынести в отдельный обработчик
      setClients([]);
      setDeals([]);
      setTasks([]);
      setStatisticsTableData([]);

      router.push("/");
    }
  };

  const buttonClasses = `flex items-center rounded p-2 ${
    isCollapsed ? "justify-center" : "px-4"
  } ${
    mounted
      ? "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
      : "hover:bg-gray-200"
  }`;

  return (
    <button onClick={handleLogout} className={buttonClasses} title="Выйти">
      <LogoutIcon />
      {!isCollapsed && <span className="ml-3">Выйти</span>}
    </button>
  );
}

// Компонент для навигационных ссылок
function NavLink({
  href,
  icon,
  children,
  collapsed,
  mounted,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed: boolean;
  mounted: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkClasses = `flex items-center rounded p-2 ${
    isActive ? (mounted ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-200") : ""
  } ${collapsed ? "justify-center" : "px-4"} ${
    mounted
      ? "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
      : "hover:bg-gray-200"
  }`;

  return (
    <Link
      href={href}
      className={linkClasses}
      title={collapsed ? String(children) : undefined}
    >
      {icon}
      {!collapsed && <span className="ml-3">{children}</span>}
    </Link>
  );
}
