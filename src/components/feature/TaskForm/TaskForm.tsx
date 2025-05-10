"use client";

import React from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Task } from "@/utils/types";
import { useDealsStore } from "@/store/dealsStore";

type TaskFormProps = {
  register: UseFormRegister<Task>;
  errors: FieldErrors<Task>;
};

export const TaskForm: React.FC<TaskFormProps> = ({ register, errors }) => {
  const { deals } = useDealsStore();

  return (
    <>
      <InputFieldUi
        label="Название"
        {...register("name", { required: "Обязательное поле" })}
        error={errors.name?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dealId"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Сделка
          </label>
          <select
            id="dealId"
            {...register("dealId", { required: "Выберите сделку" })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          >
            <option value="">Выберите сделку</option>
            {deals.map((deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.name}
              </option>
            ))}
          </select>
          {errors.dealId && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.dealId.message}
            </p>
          )}
        </div>

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
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputFieldUi
          label="Выполнить до"
          type="date"
          {...register("deadline", { required: "Укажите дату выполнения" })}
          error={errors.deadline?.message}
        />

        <InputFieldUi
          label="Исполнитель"
          {...register("executor")}
          error={errors.executor?.message}
        />
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
