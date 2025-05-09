"use client";

import { login } from "@/services/auth";
import { registerUser } from "@/services/registerUser";

import { useState } from "react";
// import { cookies } from 'next/headers';

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { UserLoginI } from "@/utils/types";
// import { AuthForm } from "@/components/feature/AuthForm/AuthForm";

import { LoginForm } from "@/components/feature/LoginForm/LoginForm";
import { MainPageInfo } from "@/components/feature/MainPageInfo/MainPageInfo";
import { RegisterForm } from "@/components/feature/RegisterForm/RegisterForm";
import { PasswordResetForm } from "@/components/feature/PasswordResetForm/PasswordResetForm";
import { EmailConfirmForm } from "@/components/feature/EmailConfirmForm/EmailConfirmForm";
import { RegisterFormDataType } from "@/utils/types";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

// const loginSchema = z.object({
//   email: z.string().min(1, "Поле Email обязательно"),
//   password: z.string().min(4, "Пароль должен содержать минимум 6 символов"),
// });

export default function LoginPage() {
  // const { reset } = useForm<UserLoginI>({
  //   resolver: zodResolver(loginSchema),
  // });

  const router = useRouter();

  const [showMobileForm, setShowMobileForm] = useState(false);

  const [activeForm, setActiveForm] = useState<"login" | "register" | "resetPassword" | "emailConfirm">("login");

  const [resetEmail, setResetEmail] = useState("");

  const handleRegister = async (requestData: RegisterFormDataType) => {
    const { success, message, data } = await registerUser(requestData);

    enqueueSnackbar(message, { variant: success ? "success" : "error" });

    if (success && data?.token) {
      router.push("/");
    }
  };

  const handleLogin = async (requestData: UserLoginI) => {
    const { success, message, data } = await login(requestData);

    enqueueSnackbar(message, { variant: success ? "success" : "error" });

    if (success && data?.token) {
      router.push("/");
    }
  };

  const handleResetPassword = async (email: string) => {
    setResetEmail(email);
    
    enqueueSnackbar("Письмо с инструкциями отправлено на вашу почту", { 
      variant: "success" 
    });
    
    setActiveForm("emailConfirm");
  };

  const handleConfirmEmail = (confirmCode: string) => {
    enqueueSnackbar("Пароль успешно изменен", { variant: "success" });
    setActiveForm("login");
  };

  const handleResendEmail = () => {
    enqueueSnackbar("Письмо с инструкциями отправлено повторно", { variant: "success" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 relative overflow-hidden">
      {/* Градиентные пятна на фоне */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Для светлой темы */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-[#172554] rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 dark:bg-[#052e15] rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 dark:bg-[#422006] rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Основной контент */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:p-12">
          {/* Левая колонка с описанием (всегда видна на десктопе) */}
          <MainPageInfo
            showMobileForm={showMobileForm}
            setActiveForm={setActiveForm}
            activeForm={activeForm}
            setShowMobileForm={setShowMobileForm}
          />

          {/* Правая колонка для всех форм */}
          <div className={`${showMobileForm ? "block" : "hidden"} md:block`}>
            {activeForm === "login" && (
              <LoginForm
                onSubmit={handleLogin}
                showMobileForm={showMobileForm}
                onForgotPassword={() => setActiveForm("resetPassword")}
              />
            )}
            
            {activeForm === "resetPassword" && (
              <PasswordResetForm 
                onSubmit={handleResetPassword}
                showMobileForm={showMobileForm}
              />
            )}
            
            {activeForm === "register" && (
              <RegisterForm
                onSubmit={handleRegister}
                showMobileForm={showMobileForm}
              />
            )}

            {activeForm === "emailConfirm" && (
              <EmailConfirmForm
                onConfirm={handleConfirmEmail}
                onResendEmail={handleResendEmail}
                showMobileForm={showMobileForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
