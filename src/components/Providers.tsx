"use client";

import { SnackbarProvider } from "notistack";
import AdaptiveNavbar from "./AdaptiveNavbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// import { ModalContainer } from "@/components/shared/ModalContainer/ModalContainer";
// import {
//   FieldErrors,
//   SubmitHandler,
//   useForm,
//   UseFormRegister,
// } from "react-hook-form";

// import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
// import {
//   getPrimaryActionText,
//   getSecondaryActionClass,
//   getSecondaryActionText,
// } from "@/utils/actionButtonsUtils";
// import { getModalTitle } from "@/utils/modalUtils";

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
<<<<<<< HEAD
      <div className="flex min-h-screen bg-white dark:bg-gray-900">
        {pathname !== "/login" && <AdaptiveNavbar />}
=======
      <div className="flex overflow-y-hidden bg-white dark:bg-gray-900">
        {pathname !== "/login" && <Navbar />}
>>>>>>> 2a0e640 (Обновлена инофрмация для главной страницы)
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SnackbarProvider>
  );
}
