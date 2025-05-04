"use client";

import { useState, ReactNode } from "react";
import { ModalsContainer } from "@/components/feature/ModalsContainer/ModalsContainer";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { ClientFormData } from "@/components/feature/ClientForm/ClientForm";
import { DealFormData } from "@/components/feature/DealForm/DealForm";
import { TaskFormData } from "@/components/feature/TaskForm/TaskForm";

type EntityType = "client" | "deal" | "task";
type PageType = "clients" | "deals" | "tasks";
type FormDataType = ClientFormData | DealFormData | TaskFormData;

type EntityPageContainerProps = {
  entityType: EntityType;
  pageType: PageType;
  sampleData: FormDataType;
  extraContent?: ReactNode;
};

export const EntityPageContainer: React.FC<EntityPageContainerProps> = ({
  entityType,
  pageType,
  sampleData,
  extraContent,
}) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "new" | "edit" | "view";
    data?: Partial<FormDataType>;
  }>({
    isOpen: false,
    type: "new",
    data: undefined,
  });

  const openModal = (type: "new" | "edit" | "view", data?: Partial<FormDataType>) => {
    setModalState({
      isOpen: true,
      type,
      data,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = (data: FormDataType) => {
    console.log(`Submitting ${entityType} data:`, data);
    // Под логику сохранения данных
  };

  const getDemoButtonsTitle = (entityType: EntityType): { edit: string; view: string } => {
    switch (entityType) {
      case "client":
        return {
          edit: 'Открыть "Карточка клиента"',
          view: 'Открыть "Просмотр клиента"',
        };
      case "deal":
        return {
          edit: 'Открыть "Карточка сделки"',
          view: 'Открыть "Просмотр сделки"',
        };
      case "task":
        return {
          edit: 'Открыть "Карточка задачи"',
          view: 'Открыть "Просмотр задачи"',
        };
      default:
        return {
          edit: 'Редактировать',
          view: 'Просмотреть',
        };
    }
  };

  const getPageTitle = (pageType: PageType): string => {
    switch (pageType) {
      case "clients":
        return "Клиенты";
      case "deals":
        return "Сделки";
      case "tasks":
        return "Задачи";
      default:
        return "Данные";
    }
  };

  const getAddButtonText = (pageType: PageType): string => {
    switch (pageType) {
      case "clients":
        return "Новый клиент";
      case "deals":
        return "Новая сделка";
      case "tasks":
        return "Новая задача";
      default:
        return "Добавить";
    }
  };

  const buttonTitles = getDemoButtonsTitle(entityType);
  const pageTitle = getPageTitle(pageType);
  const addButtonText = getAddButtonText(pageType);

  const DemoButtons = () => (
    <div className="flex space-x-4 mb-6">
      <ButtonUi
        onClick={() => openModal("edit", sampleData)}
        variant="secondary"
      >
        {buttonTitles.edit}
      </ButtonUi>
      <ButtonUi
        onClick={() => openModal("view", sampleData)}
        variant="secondary"
      >
        {buttonTitles.view}
      </ButtonUi>
    </div>
  );

  return (
    <>
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => openModal("new")}
          >
            {addButtonText}
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Искать"
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {/* Здесь будет содержимое таблицы, которое будет отличаться для каждого типа данных */}
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Данные для таблицы &ldquo;{pageTitle}&rdquo; будут загружены здесь
          </div>
        </div>
      </div>
      
      {/* Демонстрационные кнопки для отображения модальных окон */}
      <div className="p-4">
        <DemoButtons />
        {extraContent}
      </div>

      {/* Модальное окно */}
      <ModalsContainer
        entityType={entityType}
        modalType={modalState.type}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        initialData={modalState.data}
        onSubmit={handleSubmit}
      />
    </>
  );
}; 