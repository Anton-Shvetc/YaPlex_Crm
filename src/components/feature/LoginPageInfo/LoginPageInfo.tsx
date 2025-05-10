"use client";

import { LoginPageInfoI } from "@/utils/types";

export const LoginPageInfo: React.FC<LoginPageInfoI> = ({
  activeForm,
  setActiveForm,
  showMobileForm,
  setShowMobileForm,
}) => {
  return (
    <div
      className={`flex flex-col justify-center ${
        showMobileForm ? "hidden md:flex" : ""
      }`}
    >
      {/* Заголовок - белый в темной теме */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
        YaPlex
      </h1>

      {/* Основной текст - светло-серый в темной теме */}
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
        Платформа для управления клиентами, сделками и задачами. Эффективно
        управляйте бизнес-процессами, отслеживайте ключевые показатели и
        выстраивайте продуктивные отношения с клиентами.
      </p>

      {activeForm === "register" && !showMobileForm && (
        <div className="hidden flex-col md:flex">
          <p className="text-gray-500 dark:text-white">Уже зарегистрированы?</p>

          <button
            className="text-[#2563EB] w-fit"
            onClick={() => setActiveForm("login")}
          >
            Войти в аккаунт
          </button>
        </div>
      )}

      {activeForm === "login" && !showMobileForm && (
        <div className="hidden flex-col md:flex">
          <p className="text-gray-500 dark:text-white">
            {" "}
            У вас еще нет аккаунта
          </p>

          <button
            className="text-[#2563EB] w-fit"
            onClick={() => setActiveForm("register")}
          >
            Зарегестрироваться
          </button>
        </div>
      )}

      {/* Кнопки только для мобильных */}
      <div className="md:hidden space-y-3 mt-6">
        <button
          onClick={() => {
            setShowMobileForm(true);
            setActiveForm("login");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Войти
        </button>
        <button
          onClick={() => {
            setShowMobileForm(true);
            setActiveForm("register");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Регистрация
        </button>
      </div>
    </div>
  );
};
