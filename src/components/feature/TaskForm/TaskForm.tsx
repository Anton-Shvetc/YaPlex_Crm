"use client";

import React, { useState } from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";

export type TaskFormData = {
  name: string;
  deal: string;
  description: string;
  dueDate: string;
  assignee: string;
  status: string;
};

type TaskFormProps = {
  initialData?: Partial<TaskFormData>;
  onSubmit: (formData: TaskFormData) => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    name: initialData.name || "",
    deal: initialData.deal || "",
    description: initialData.description || "",
    dueDate: initialData.dueDate || "",
    assignee: initialData.assignee || "",
    status: initialData.status || "Новая",
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
        <InputFieldUi
          label="Название"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <InputFieldUi
            label="Сделка"
            name="deal"
            value={formData.deal}
            onChange={handleChange}
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
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputFieldUi
            label="Выполнить до"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <InputFieldUi
            label="Исполнитель"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
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