"use client";

import React from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Deals } from "@/utils/types";

type DealFormProps = {
  register: UseFormRegister<Deals>;
  errors: FieldErrors<Deals>;
};

export const DealForm: React.FC<DealFormProps> = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputFieldUi
          label="Название"
          {...register("name", { required: "Обязательное поле" })}
          error={errors.name?.message}
        />

        <InputFieldUi
          label="Клиент"
          {...register("clientId", { required: "Обязательное поле" })}
          error={errors.clientId?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputFieldUi
          label="Сумма"
          type="text"
          {...register("amount", {
            required: "Обязательное поле",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Введите корректную сумму",
            },
          })}
          error={errors.amount?.message}
        />

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Статус
          </label>
          <select
            id="status"
            {...register("status", { required: "Выберите статус" })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          >
            <option value="">Выберите статус</option>
            <option value="Новая">Новая</option>
            <option value="В работе">В работе</option>
            <option value="Завершена">Завершена</option>
            <option value="Отменена">Отменена</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Описание
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description", {
            maxLength: {
              value: 500,
              message: "Максимальная длина 500 символов",
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>
    </>
  );
};
