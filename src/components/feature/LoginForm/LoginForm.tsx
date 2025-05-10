"use client";

import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import { InputFieldUi } from "@/components/ui/InputFieldUi";

import { LoginFormDataType } from "@/utils/types";
import { useForm } from "react-hook-form";

export const LoginForm = ({
  onSubmit,
  showMobileForm,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  showMobileForm: boolean;
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
        >
          Забыли пароль?
        </button>
      </div>
    </FormWrapper>
  );
};
