"use client";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import {
  getSecondaryActionClass,
  getSecondaryActionText,
} from "@/utils/actionButtonsUtils";
// import { ClientFormData } from "@/components/feature/ClientForm/ClientForm";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  website: string;
  email: string;
  comment: string;
};

export default function ClientsPage() {
  // const sampleClient: ClientFormData = {
  //   name: "Ilya B",
  //   phone: "+7 XXX XXX XXXX",
  //   company: "YaPlex_CRM",
  //   email: "ilya@yandex.ru",
  //   website: "www.yandex.ru",
  //   comment: "Комментарий",
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ClientFormData>();


  return (
    <EntityPageContainer
      entityType="client"
      pageType="clients"
      actionButtonText= "Новый клиент"
      pageTitle="Клиенты"
      formComponent={ClientForm}


    />
  );
}
