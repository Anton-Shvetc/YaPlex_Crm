"use client";

import { useState } from "react";

import { ButtonUi } from "@/components/ui/ButtonUi";
import { ClientFormData } from "@/components/feature/ClientForm/ClientForm";
import { DealFormData } from "@/components/feature/DealForm/DealForm";
import { TaskFormData } from "@/components/feature/TaskForm/TaskForm";
import {
  EntityTypeMap,
  ModalContainer,
} from "@/components/shared/ModalContainer/ModalContainer";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";

import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import {
  getPrimaryActionText,
  getSecondaryActionClass,
  getSecondaryActionText,
} from "@/utils/actionButtonsUtils";
import { getModalTitle } from "@/utils/modalUtils";

type EntityType = "client" | "deal" | "task";
type PageType = "clients" | "deals" | "tasks";

type EntityFormMap = {
  client: ClientFormData;
  deal: DealFormData;
  task: TaskFormData;
};

interface EntityPageContainerProps<T extends EntityType> {
  entityType: T;
  pageTitle: string;
  actionButtonText: string;
  pageType: PageType;
  formComponent: React.FC<{
    register: UseFormRegister<EntityFormMap[T]>;
    errors: FieldErrors<EntityFormMap[T]>;
  }>;
  extraContent?: React.ReactNode;
}

export const EntityPageContainer = <T extends EntityType>({
  entityType,
  formComponent: FormComponent,
  extraContent,
  pageType,
  actionButtonText,
  pageTitle,
}: EntityPageContainerProps<T>) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "new" | "edit" | "view";
    data?: Partial<EntityFormMap[T]>;
  }>({
    isOpen: false,
    type: "new",
    data: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntityFormMap[T]>();

  const onSubmit: SubmitHandler<EntityFormMap[T]> = (data) => {
    console.log("submit data", data);
    // Обработка данных формы
  };

  const openModal = (type: "new" | "edit" | "view") => {
    setModalState({
      isOpen: true,
      type,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const getDemoButtonsTitle = (
    entityType: EntityType
  ): { edit: string; view: string } => {
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
          edit: "Редактировать",
          view: "Просмотреть",
        };
    }
  };

  const buttonTitles = getDemoButtonsTitle(entityType);

  const DemoButtons = () => (
    <div className="flex space-x-4 mb-6">
      <ButtonUi onClick={() => openModal("edit")} variant="secondary">
        {buttonTitles.edit}
      </ButtonUi>
      <ButtonUi onClick={() => openModal("view")} variant="secondary">
        {buttonTitles.view}
      </ButtonUi>
    </div>
  );

  return (
    <>
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => openModal("new")}
          >
            {actionButtonText}
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Искать"
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
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

      <ModalContainer<EntityTypeMap[T]>
        modalTitle={getModalTitle(modalState.type, entityType)}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        children={
          <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
            primaryAction={{
              text: getPrimaryActionText(modalState.type),
              type: "submit",
            }}
            secondaryAction={{
              text: getSecondaryActionText(modalState.type, pageType),
              onClick: () => {
                // TODO - прописано хардкодом, заменить
                console.log("delete", "Запрос на удаление");
                closeModal();
              },
              className: getSecondaryActionClass(modalState.type, pageType),
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              <FormComponent register={register} errors={errors} />
            </div>
          </FormWrapper>
        }
      />
    </>
  );
};
