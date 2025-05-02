"use client";

import { SnackbarProvider } from "notistack";
import Navbar from "./Navbar";

import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="flex min-h-screen">
        {pathname !== "/login" && <Navbar />}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SnackbarProvider>
  );
}
