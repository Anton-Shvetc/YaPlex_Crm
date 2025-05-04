"use client";

import React, { useState } from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  email: string;
  website: string;
  comment: string;
};

type ClientFormProps = {
  initialData?: Partial<ClientFormData>;
  onSubmit: (formData: ClientFormData) => void;
};

export const ClientForm: React.FC<ClientFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: initialData.name || "",
    phone: initialData.phone || "",
    company: initialData.company || "",
    email: initialData.email || "",
    website: initialData.website || "",
    comment: initialData.comment || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          label="Имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <InputFieldUi
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputFieldUi
            label="Компания"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputFieldUi
            label="Сайт"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
          />

          <InputFieldUi
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Комментарий
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
        </div>
      </div>
    </form>
  );
}; 