"use client";

import React, { useState } from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  website: string;
  email: string;
  comment: string;
};

type ClientFormProps = {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
};
export const ClientForm: React.FC<ClientFormProps> = ({ register, errors }) => {
  return (
    <>
      <InputFieldUi
        label="Имя"
        {...register("name", { required: "Обязательное поле" })}
        error={errors?.name?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputFieldUi
          label="Телефон"
          {...register("phone", { required: "Обязательное поле" })}
          error={errors?.phone?.message}
        />

        <InputFieldUi
          label="Компания"
          {...register("company", { required: "Обязательное поле" })}
          error={errors?.company?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputFieldUi
          label="Сайт"
          // type="url"
          {...register("website", { required: "Обязательное поле" })}
          error={errors?.website?.message}
        />

        <InputFieldUi
          label="Email"
          type="email"
          {...register("email", {
            required: "Обязательное поле",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Неверный формат email",
            },
          })}
          error={errors?.email?.message}
        />
      </div>

      <InputFieldUi
        rows={4}
        label="Комментарий"
        type="textarea"
        {...register("comment")}
      />
    </>
  );
};
