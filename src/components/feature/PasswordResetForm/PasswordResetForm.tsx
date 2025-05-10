"use client";

import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { useForm } from "react-hook-form";

interface PasswordResetFormProps {
  onSubmit: (email: string) => void;
  showMobileForm: boolean;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  onSubmit,
  showMobileForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const handleFormSubmit = (data: { email: string }) => {
    onSubmit(data.email);
  };

  return (
    <FormWrapper
      title="Восстановление пароля"
      btnTitle="Восстановить"
      onSubmit={handleSubmit(handleFormSubmit)}
      additionalStyle={
        !showMobileForm
          ? "bg-white/80 dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          : "bg-transparent"
      }
    >
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Укажите почту, на которую вы регистрировали аккаунт, и мы отправим вам инструкцию по восстановлению пароля.
      </p>

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
    </FormWrapper>
  );
}; 