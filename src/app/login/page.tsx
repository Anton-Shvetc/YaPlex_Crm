"use client";

import { auth } from "@/services/auth";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserLoginI } from "@/utils/interfaces/UserI";
// import { AuthForm } from "@/components/feature/AuthForm/AuthForm";

import { LoginForm } from "@/components/feature/LoginForm/LoginForm";
import { MainPageInfo } from "@/components/feature/MainPageInfo/MainPageInfo";
import { RegisterForm } from "@/components/feature/RegisterForm/RegisterForm";

const loginSchema = z.object({
  login: z.string().min(1, "Поле Логин обязательно"),
  password: z.string().min(4, "Пароль должен содержать минимум 6 символов"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginI>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (userData: UserLoginI) => {
    const { success } = await auth(userData);

    if (success) reset();
  };
  const [showMobileForm, setShowMobileForm] = useState(false);

  const [activeForm, setActiveForm] = useState<"login" | "register">("login");

  const handleRegister = (data: any) => {
    console.log("Register data:", data);
    // Обработка регистрации
  };

  const handleLogin = (data: any) => {
    console.log("Login data:", data);
    // Обработка входа
  };

  console.log("showAuthForm", activeForm, showMobileForm);

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
          {/* Колонка с описанием (всегда видна на десктопе) */}
          <MainPageInfo
            showMobileForm={showMobileForm}
            setActiveForm={setActiveForm}
            activeForm={activeForm}
            setShowMobileForm={setShowMobileForm}
          />

          <div
            className={`${showMobileForm ? "block" : "hidden"} md:${
              activeForm === "register" ? "block" : "hidden"
            }`}
          >
            {activeForm === "register" && (
              <RegisterForm onSubmit={handleRegister} />
            )}
          </div>

          <div className={`${showMobileForm ? "block" : "hidden"} md:block`}>
            {activeForm === "login" && (
              <LoginForm
                onSubmit={handleLogin}
                showMobileForm={showMobileForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
