"use client";

import React, { useState } from "react";
import { ModalUi } from "@/components/ui/ModalUi";
import { ClientForm, ClientFormData } from "@/components/feature/ClientForm/ClientForm";
import { DealForm, DealFormData } from "@/components/feature/DealForm/DealForm";
import { TaskForm, TaskFormData } from "@/components/feature/TaskForm/TaskForm";

type EntityType = "client" | "deal" | "task";
type ModalType = "new" | "edit" | "view";
type FormType = "new" | "edit";

type ModalsContainerProps = {
  entityType: EntityType;
  modalType: ModalType;
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmit: (data: any) => void;
};

export const ModalsContainer: React.FC<ModalsContainerProps> = ({
  entityType,
  modalType,
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
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
    if (!dateString) return '';
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    }
    
    return dateString;
  };

  const formatValueForDisplay = (key: string, value: any): string => {
    if (key === 'dueDate' || key === 'deadline') {
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


  const getPrimaryActionText = (): string => {
    if (modalType === "new") {
      return "Создать";
    } else if (modalType === "edit") {
      return "Редактировать";
    } else {
      return "ОК";
    }
  };

  const getSecondaryActionText = (): string => {
    if (modalType === "edit") {
      switch (entityType) {
        case "client":
          return "Удалить клиента";
        case "deal":
          return "Завершить сделку";
        case "task":
          return "Завершить задачу";
      }
    }
    return "Отменить";
  };

  const getSecondaryActionClass = (): string => {
    if (modalType === "edit") {
      switch (entityType) {
        case "client":
          return "bg-red-500 hover:bg-red-600 text-white border-none";
        case "deal":
          return "bg-green-500 hover:bg-green-600 text-white border-none";
        case "task":
          return "bg-green-500 hover:bg-green-600 text-white border-none";
      }
    }
    return "";
  };

  const handleSubmit = (data: ClientFormData | DealFormData | TaskFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleSecondaryAction = () => {
    if (modalType === "edit") {
      // Логика для удаления клиента/завершения сделки или задачи
      console.log(`${entityType} secondary action`);
    }
    onClose();
  };

  const renderForm = () => {
    if (modalType === "view") {
      return (
        <div className="space-y-4 text-gray-800 dark:text-white">
          {Object.entries(initialData || {}).map(([key, value]) => (
            <div key={key} className="mb-2">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{getFieldLabel(key, entityType)}</div>
              <div>{formatValueForDisplay(key, value)}</div>
            </div>
          ))}
        </div>
      );
    }

    const formTypeForComponents: FormType = modalType === "new" ? "new" : "edit";

    switch (entityType) {
      case "client":
        return (
          <ClientForm
            initialData={initialData}
            onSubmit={handleSubmit}
            formType={formTypeForComponents}
          />
        );
      case "deal":
        return (
          <DealForm
            initialData={initialData}
            onSubmit={handleSubmit}
            formType={formTypeForComponents}
          />
        );
      case "task":
        return (
          <TaskForm
            initialData={initialData}
            onSubmit={handleSubmit}
            formType={formTypeForComponents}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalUi
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      primaryAction={{
        text: getPrimaryActionText(),
        onClick: () => {
          if (modalType === "view") {
            onClose();
            return;
          }
          const form = document.querySelector("form");
          if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
        },
      }}
      secondaryAction={{
        text: getSecondaryActionText(),
        onClick: handleSecondaryAction,
        className: getSecondaryActionClass(),
      }}
    >
      {renderForm()}
    </ModalUi>
  );
}; 