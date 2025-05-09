"use client";

import { SnackbarProvider } from "notistack";
import AdaptiveNavbar from "./AdaptiveNavbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="flex min-h-screen bg-white dark:bg-gray-900">
        {pathname !== "/login" && <AdaptiveNavbar />}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SnackbarProvider>
  );
}
