"use client";

import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import { InputFieldUi } from "@/components/ui/InputFieldUi";

import { LoginFormDataType } from "@/utils/types";
import { useForm } from "react-hook-form";

export const LoginForm = ({
  onSubmit,
  showMobileForm,
  onForgotPassword,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  showMobileForm: boolean;
  onForgotPassword?: () => void;
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormDataType>();

  return (
    <FormWrapper
      title="Вход в систему"
      btnTitle="Войти"
      onSubmit={handleSubmit(onSubmit)}
      additionalStyle={
        !showMobileForm
          ? "bg-white/80 dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          : "bg-transparent"
      }
    > 
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Вход в систему
      </h2>
      <InputFieldUi
        label="Email"
        type="email"
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некорректный email",
          },
        })}
        error={errors.email?.message}
      />

      <InputFieldUi
        label="Пароль"
        type="password"
        {...register("password", {
          required: "Обязательное поле",
          minLength: {
            value: 6,
            message: "Минимум 6 символов",
          },
        })}
        error={errors.password?.message}
        placeholder="******"
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={onForgotPassword}
        >
          Забыли пароль?
        </button>
      </div>
    </FormWrapper>
  );
};
