"use client";

import React, { useState } from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";

export type DealFormData = {
  name: string;
  client: string;
  amount: string;
  status: string;
  description: string;
};

type DealFormProps = {
  initialData?: Partial<DealFormData>;
  onSubmit: (formData: DealFormData) => void;
  formType: "new" | "edit";
};

export const DealForm: React.FC<DealFormProps> = ({
  initialData = {},
  onSubmit,
  formType,
}) => {
  const [formData, setFormData] = useState<DealFormData>({
    name: initialData.name || "",
    client: initialData.client || "",
    amount: initialData.amount || "",
    status: initialData.status || "Новая",
    description: initialData.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InputFieldUi
            label="Название"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <InputFieldUi
            label="Клиент"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputFieldUi
            label="Сумма"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="text"
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
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            >
              <option value="Новая">Новая</option>
              <option value="В работе">В работе</option>
              <option value="Завершена">Завершена</option>
              <option value="Отменена">Отменена</option>
            </select>
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
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
        </div>
      </div>
    </form>
  );
}; 