"use client";

import React from "react";
import { ModalUi } from "@/components/ui/ModalUi";
import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { DealForm, DealFormData } from "@/components/feature/DealForm/DealForm";
import { TaskForm, TaskFormData } from "@/components/feature/TaskForm/TaskForm";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";

type EntityType = "client" | "deal" | "task";
type ModalType = "new" | "edit" | "view";
type FormDataType = ClientFormData | DealFormData | TaskFormData;

type ModalsContainerProps<T> = {
  entityType: string;
  modalType: string;
  isOpen: boolean;
  onClose: () => void;
  // initialData?: Partial<T>;
  onSubmit?: () => void;
  children: React.ReactNode;
};

export type EntityTypeMap = {
  client: ClientFormData;
  deal: DealFormData;
  task: TaskFormData;
};

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  website: string;
  email: string;
  comment: string;
};

export const ModalContainer = <T extends FieldValues>({
  entityType,
  modalType,
  isOpen,
  onClose,
  onSubmit,
  children
}: ModalsContainerProps<T>) => {


  const getFieldLabel = (key: string, entityType: EntityType): string => {
    const commonFields: Record<string, string> = {
      description: "Описание",
      status: "Статус",
    };

    const clientFields: Record<string, string> = {
      ...commonFields,
      name: "Имя",
      company: "Компания",
      email: "Email",
      phone: "Телефон",
      address: "Адрес",
      contactPerson: "Контактное лицо",
      comment: "Комментарий",
      website: "Веб-сайт",
    };

    const dealFields: Record<string, string> = {
      ...commonFields,
      name: "Название",
      client: "Клиент",
      amount: "Сумма",
      stage: "Этап",
      responsible: "Ответственный",
      deadline: "Срок сделки",
    };

    const taskFields: Record<string, string> = {
      ...commonFields,
      name: "Название",
      deal: "Сделка",
      dueDate: "Срок выполнения",
      assignee: "Исполнитель",
    };

    switch (entityType) {
      case "client":
        return clientFields[key] || key;
      case "deal":
        return dealFields[key] || key;
      case "task":
        return taskFields[key] || key;
      default:
        return key;
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    }

    return dateString;
  };

  const formatValueForDisplay = (key: string, value: unknown): string => {
    if (key === "dueDate" || key === "deadline") {
      return formatDate(String(value));
    }
    return String(value);
  };

  const getModalTitle = (): string => {
    if (modalType === "new") {
      switch (entityType) {
        case "client":
          return "Новый клиент";
        case "deal":
          return "Новая сделка";
        case "task":
          return "Новая задача";
      }
    } else if (modalType === "edit") {
      switch (entityType) {
        case "client":
          return "Карточка клиента";
        case "deal":
          return "Карточка сделки";
        case "task":
          return "Карточка задачи";
      }
    } else {
      switch (entityType) {
        case "client":
          return "Просмотр клиента";
        case "deal":
          return "Просмотр сделки";
        case "task":
          return "Просмотр задачи";
      }
    }
    return "";
  };

  // const getPrimaryActionText = (): string => {
  //   if (modalType === "new") {
  //     return "Создать";
  //   } else if (modalType === "edit") {
  //     return "Редактировать";
  //   } else {
  //     return "ОК";
  //   }
  // };

  // const getSecondaryActionText = (): string => {
  //   if (modalType === "edit") {
  //     switch (entityType) {
  //       case "client":
  //         return "Удалить клиента";
  //       case "deal":
  //         return "Завершить сделку";
  //       case "task":
  //         return "Завершить задачу";
  //     }
  //   }
  //   return "Отменить";
  // };
  

  // const getSecondaryActionClass = (): string => {
  //   if (modalType === "edit") {
  //     switch (entityType) {
  //       case "client":
  //         return "bg-red-500 hover:bg-red-600 text-white border-none";
  //       case "deal":
  //         return "bg-green-500 hover:bg-green-600 text-white border-none";
  //       case "task":
  //         return "bg-green-500 hover:bg-green-600 text-white border-none";
  //     }
  //   }
  //   return "";
  // };

  // const handleSubmit = (data: FormDataType) => {
  //   onSubmit(data);
  //   onClose();
  // };

  

  const handleSecondaryAction = () => {
    if (modalType === "edit") {
      // Логика для удаления клиента/завершения сделки или задачи
      console.log(`${entityType} secondary action`);
    }
    onClose();
  };

  // const renderForm = () => {
  //   if (modalType === "view") {
  //     return (
  //       <div className="space-y-4 text-gray-800 dark:text-white">
  //         {Object.entries(initialData || {}).map(([key, value]) => (
  //           <div key={key} className="mb-2">
  //             <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
  //               {getFieldLabel(key, entityType)}
  //             </div>
  //             <div>{formatValueForDisplay(key, value)}</div>
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   }

  //   switch (entityType) {
  //     case "client":
  //       return <ClientForm  register={register} />;
  //     // case "deal":
  //     //   return <DealForm initialData={initialData} register={register}/>;
  //     // case "task":
  //     //   return <TaskForm initialData={initialData} register={register} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <ModalUi
      isOpen={isOpen}
      title={getModalTitle()}
      onClose={onClose}
      // primaryAction={{
      //   text: getPrimaryActionText(),
      //   type: "submit",
      //   // onClick: onSubmit,
      // }}
      // secondaryAction={{
      //   text: getSecondaryActionText(),
      //   onClick: handleSecondaryAction,
      //   className: getSecondaryActionClass(),
      // }}
    >
      {children}
    </ModalUi>
  );
};
