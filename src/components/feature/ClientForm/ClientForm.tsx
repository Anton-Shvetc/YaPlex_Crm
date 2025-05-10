"use client";

import React from "react";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { Client } from "@/utils/types/index";

type ClientFormProps = {
  register: UseFormRegister<Client>;
  errors: FieldErrors<Client>;
};
export const ClientForm: React.FC<ClientFormProps> = ({ register, errors }) => {
  return (
    <>
      <InputFieldUi
        label="Имя"
        {...register("name", { required: "Обязательное поле" })}
        error={errors?.name?.message}
      />

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <InputFieldUi
          label="Телефон"
          {...register("phone", {
            pattern: {
              value: /^[0-9]*$/, // только цифры
              message: "Введите только цифры",
            },
          })}
          error={errors?.phone?.message}
        />

        <InputFieldUi
          label="Компания"
          {...register("company", { required: "Обязательное поле" })}
          error={errors?.company?.message}
        />
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <InputFieldUi
          label="Сайт"
          // type="url"
          {...register("website")}
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
