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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Градиентные пятна на фоне */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Основной контент */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          {/* Колонка с описанием (всегда видна на десктопе) */}
          <MainPageInfo
            showMobileForm={showMobileForm}
            setActiveForm={setActiveForm}
            activeForm={activeForm}
            setShowMobileForm={setShowMobileForm}
          />

          <div
            className={`${showMobileForm ? "block" : "hidden"} md: ${
              activeForm === "register" ? "block" : "hidden"
            }`}
          >
            {activeForm === "register" && (
              <RegisterForm onSubmit={handleRegister} />
            )}
          </div>

          <div className={`${showMobileForm ? "block" : "hidden"} md:block`}>
            {activeForm === "login" && <LoginForm onSubmit={handleLogin} />}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="admin" className="sr-only">
                Login
              </label>
              <input
                id="admin"
                type="text"
                autoComplete="username"
                {...register("login")}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.login ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Логин"
              />
              {errors.login && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.login.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Пароль"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Запомнить меня
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Вход..." : "Войти"}
            </button>
          </div>
        </form> */
}
