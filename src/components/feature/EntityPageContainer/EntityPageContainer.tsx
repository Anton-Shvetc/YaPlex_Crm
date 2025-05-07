"use client";

import { useEffect, useState } from "react";

import { ModalContainer } from "@/components/shared/ModalContainer/ModalContainer";
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
import { FetchService } from "@/services/fetcher";

import { enqueueSnackbar } from "notistack";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";

import { Client, Deal, Task } from "@/utils/types";
import { ButtonUi } from "@/components/ui/ButtonUi";

type EntityType = "client" | "deal" | "task";
type PageType = "clients" | "deals" | "tasks";

type EntityFormMap = {
  client: Client;
  deal: Deal;
  task: Task;
};

type EntityTableRowMap = {
  client: Client;
  deal: Deal;
  task: Task;
};
type ColumnDefinition<T> = {
  key: string;
  label: string;
  render?: (value: number | string, row: T) => React.ReactNode;
};

interface EntityPageContainerProps<T extends EntityType> {
  entityType: T;
  pageTitle: string;
  requestLink?: string;
  updateTableData?: () => void;
  tableData?: EntityTableRowMap[T][];
  actionButtonText: string;
  pageType: PageType;
  columns: ColumnDefinition<EntityTableRowMap[T]>[];
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
  requestLink = undefined,
  tableData,
  updateTableData,
  columns,
  pageType,
  actionButtonText,
  pageTitle,
}: EntityPageContainerProps<T>) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "new" | "edit" | "view";
  }>({
    isOpen: false,
    type: "new",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntityFormMap[T]>();

  const onSubmit: SubmitHandler<EntityFormMap[T]> = async (data) => {
    if (!requestLink) return;
    try {
      let response;

      if (modalState.type === "new") {
        response = await new FetchService().POST(requestLink, data).send();
      } else if (modalState.type === "edit") {
        // Для PUT запроса обычно нужно добавлять ID в URL
        response = await new FetchService()
          .PUT(`${requestLink}/${data.id}`, data) // предполагая, что itemId есть в modalState
          .send();
      } else {
        throw new Error("Неизвестный тип операции");
      }

      const { success, message } = response;

      enqueueSnackbar(message, { variant: success ? "success" : "error" });

      if (success) {
        reset();
        setModalState((prev) => ({ ...prev, isOpen: false }));

        if (updateTableData) updateTableData();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Ошибка при создании ", { variant: "error" });
    }
  };

  const openModal = (type: "new" | "edit" | "view") => {
    if (type === "new") reset({} as EntityFormMap[T]);
    setModalState({
      isOpen: true,
      type,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handelChangeFormData = (data: EntityFormMap[T]) => {
    console.log("table rowData", data);
    openModal("edit");
    reset(data);
  };

  useEffect(() => {
    if (updateTableData) updateTableData();
  }, []);

  return (
    <>
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <ButtonUi
            onClick={() => openModal("new")}
            variant="primary"
            label={actionButtonText}
          />

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
            {tableData && columns && (
              <TableContainer<EntityTableRowMap[T]>
                tableData={tableData}
                columns={columns}
                handelChangeFormData={handelChangeFormData}
              />
            )}
            Данные для таблицы &ldquo;{pageTitle}&rdquo; будут загружены здесь
          </div>
        </div>
      </div>

      {/* Модальное окно */}

      <ModalContainer
        modalTitle={getModalTitle(modalState.type, entityType)}
        isOpen={modalState.isOpen}
        onClose={closeModal}
      >
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          primaryAction={{
            text: getPrimaryActionText(modalState.type),
            type: "submit",
          }}
          secondaryAction={{
            text: getSecondaryActionText(modalState.type, pageType),
            onClick: () => closeModal(),
            className: getSecondaryActionClass(modalState.type, pageType),
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            <FormComponent register={register} errors={errors} />
          </div>
        </FormWrapper>
      </ModalContainer>
    </>
  );
};
