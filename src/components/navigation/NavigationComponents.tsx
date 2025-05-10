"use client";

import Link from "next/link";
import {
  HomeIcon,
  ClientsIcon,
  DealsIcon,
  TasksIcon,
  LogoutIcon,
  ReportsIcon,
} from "@/styles/icons";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import Image from "next/image";

export const navigationLinks = [
  { href: "/", label: "Главная", icon: <HomeIcon /> },
  { href: "/clients", label: "Клиенты", icon: <ClientsIcon /> },
  { href: "/deals", label: "Сделки", icon: <DealsIcon /> },
  { href: "/tasks", label: "Задачи", icon: <TasksIcon /> },
  { href: "/reports", label: "Отчёты", icon: <ReportsIcon /> },
];

export const COMMON_CLASSES = {
  headerIcon: "text-gray-800 dark:text-white",
  menuBackground: "bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-900 dark:to-gray-800",
};

export const DesktopNavLink = ({
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
}) => {
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
};

export const MobileNavLink = ({ 
  href, 
  icon,  
  active, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link 
      href={href} 
      className={`flex items-center rounded-lg py-3 px-4 mb-1 ${
        active 
          ? 'bg-blue-50 dark:bg-gray-700 text-blue-500' 
          : 'text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="ml-4">{children}</span>
    </Link>
  );
};

export const LogoCloseNavBarMob = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <Image
      src="/LogoCloseNavBarMob.svg"
      alt="Logo"
      width={40}
      height={40}
      priority
    />
  </div>
);

export const LogoOpenNavBarMob = () => (
  <div className="w-[102px] h-7 flex items-center justify-center">
    <Image
      src="/LogoOpenNavBarMob.svg"
      alt="Logo"
      width={102}
      height={28}
      priority
    />
  </div>
);

export const BurgerButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="block md:hidden"
    aria-label="Открыть меню"
  >
    <div className="w-6 h-0.5 bg-gray-800 dark:bg-white mb-1.5"></div>
    <div className="w-6 h-0.5 bg-gray-800 dark:bg-white mb-1.5"></div>
    <div className="w-6 h-0.5 bg-gray-800 dark:bg-white"></div>
  </button>
);

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button 
    className="ml-auto text-gray-500 dark:text-gray-400"
    onClick={onClick}
    aria-label="Закрыть меню"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
);

export function DesktopLogoutButton({
  isCollapsed,
  mounted,
  router,
}: {
  isCollapsed: boolean;
  mounted: boolean;
  router: ReturnType<typeof useRouter>;
}) {
  const handleLogout = async () => {
    const { success } = await logout();

    if (success) {
      router.push("/");
    }
  };

  const buttonClasses = `flex items-center rounded p-2 cursor-pointer ${
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

export function MobileLogoutButton({ 
  onClick 
}: { 
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center w-full rounded-lg py-3 px-4 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 mt-4"
    >
      <LogoutIcon />
      <span className="ml-4">Выйти</span>
    </button>
  );
} 

export const Navigation = () => {
  // ... existing code ...
}; 