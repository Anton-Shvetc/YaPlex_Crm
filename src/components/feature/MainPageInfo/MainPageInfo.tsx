"use client";

interface MainPageInfoI {
  showMobileForm: boolean;
  setActiveForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
  activeForm: string;
  setShowMobileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainPageInfo: React.FC<MainPageInfoI> = ({
  activeForm,
  setActiveForm,
  showMobileForm,
  setShowMobileForm,
}) => {
  console.log("showMobileForm", showMobileForm);

  return (
    <div
      className={`flex flex-col justify-center ${
        showMobileForm ? "hidden md:flex" : ""
      }`}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        YaPlex
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6">
        Платформа для управления клиентами, сделками и задачами. Эффективно
        управляйте бизнес-процессами, отслеживайте ключевые показатели
        и выстраивайте продуктивные отношения с клиентами.
      </p>

      {activeForm === "register" && (
        <div>
          Уже зарегистрированы?
          <button onClick={() => setActiveForm("login")}>
            Войти в аккаунт
          </button>
        </div>
      )}

      {activeForm === "login" && (
        <div>
          У вас еще нет аккаунта
          <button onClick={() => setActiveForm("register")}>
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
