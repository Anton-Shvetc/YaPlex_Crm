"use client";

import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { useForm } from "react-hook-form";

interface EmailConfirmFormProps {
  onConfirm: (confirmCode: string) => void;
  onResendEmail: () => void;
  showMobileForm: boolean;
}

export const EmailConfirmForm: React.FC<EmailConfirmFormProps> = ({
  onConfirm,
  onResendEmail,
  showMobileForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ confirmCode: string }>();

  const handleFormSubmit = (data: { confirmCode: string }) => {
    onConfirm(data.confirmCode);
  };

  return (
    <div className={!showMobileForm ? "bg-white/95 dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-xl p-6" : ""}>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Подтверждение почты
      </h2>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Вставьте ссылку из полученного письма
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Ссылка подтверждения</label>
          <InputFieldUi
            {...register("confirmCode", {
              required: "Обязательное поле",
            })}
            error={errors?.confirmCode?.message}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mt-2"
        >
          Подтвердить
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 mb-2">Не пришло письмо?</p>
          <button
            type="button"
            className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
            onClick={onResendEmail}
          >
            Отправить повторно
          </button>
        </div>
      </form>
    </div>
  );
}; 