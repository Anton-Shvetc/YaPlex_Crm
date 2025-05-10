"use client";

import { useEffect, useState, useCallback } from "react";

import { AdaptiveModalContainer } from "@/components/shared/ModalContainer/AdaptiveModalContainer";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";

// import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
// import {
//   getPrimaryActionText,
//   // getSecondaryActionClass,
//   // getSecondaryActionText,
// } from "@/utils/actionButtonsUtils";
import { getModalTitle } from "@/utils/modalUtils";
import { FetchService } from "@/services/fetcher";

import { enqueueSnackbar } from "notistack";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";

import { Client, Deal, Task } from "@/utils/types";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { useLoaderStore } from "@/store/useLoaderStore";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { SearchIcon } from "@/styles/icons";
import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";

type EntityType = "client" | "deal" | "task";
// type PageType = "clients" | "deals" | "tasks";

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
  primaryActionButton?: (modalType: string) =>
    | {
        text: string;
        type: "button" | "submit";
        onClick?: () => void;
        className?: string;
      }
    | undefined;
  secondaryActionButton?: (
    modalType: string,
    id: number | undefined
  ) =>
    | {
        text: string;
        type: "button" | "submit";
        onClick?: () => void;
        className?: string;
      }
    | undefined;

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
  requestLink = undefined,
  tableData,
  updateTableData,
  primaryActionButton,
  secondaryActionButton,
  columns,
  actionButtonText,
  pageTitle,
}: EntityPageContainerProps<T>) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "new" | "edit";
    modalId: number | undefined;
  }>({
    isOpen: false,
    type: "new",
    modalId: undefined,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntityFormMap[T]>();

  const { isLoading, startLoading, stopLoading } = useLoaderStore();

  const [searchParams, setSearchParams] = useState<string>("");

  const [filteredTableData, setFilteredTableData] = useState<
    EntityTableRowMap[T][]
  >(tableData || []);

  const onSubmit: SubmitHandler<EntityFormMap[T]> = async (data) => {
    if (!requestLink) return;
    try {
      startLoading();
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
      stopLoading();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Ошибка при создании ", { variant: "error" });
    }
  };

  const openModal = (type: "new" | "edit", id?: number) => {
    reset({} as EntityFormMap[T]);
    setModalState({
      isOpen: true,
      type,
      modalId: id,
    });
  };

  const closeModal = () => {
    reset({} as EntityFormMap[T]);
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handelChangeFormData = (data: EntityFormMap[T]) => {
    openModal("edit", data.id);
    reset(data);
  };

  useEffect(() => {
    if (updateTableData) updateTableData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Отключаем правило eslint, так как функция стабильна

  useEffect(() => {
    setFilteredTableData(tableData || []);
  }, [tableData]);

  const searchData = useCallback((data: EntityTableRowMap[T][], searchText: string) => {
    if (!searchText.trim()) return data || [];
    if (!data) return [];

    const searchLower = searchText.toLowerCase();

    return data.filter((item) =>
      columns.some((column) => {
        const fieldValue = item[column.key as keyof EntityTableRowMap[T]];
        return fieldValue?.toString().toLowerCase().includes(searchLower);
      })
    );
  }, [columns]);

  useEffect(() => {
    const result = searchData(tableData || [], searchParams);
    setFilteredTableData(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Отключаем правило eslint для tableData и searchData, так как они стабильны

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
            disabled={isLoading}
            label={actionButtonText}
          />

          <div className="flex-1 relative">
            <InputFieldUi
              type="text"
              placeholder="Поиск"
              onSearchParams={(value: string) => setSearchParams(value)}
              icon={<SearchIcon />}
            />
            {/* <input
              type="text"
              placeholder="Искать"
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 pl-10"
            /> */}
            {/* <span className="absolute left-3 top-2.5 text-gray-400">🔍</span> */}
          </div>
        </div>

        <div className=" rounded-lg overflow-hidden">
          {/* Здесь будет содержимое таблицы, которое будет отличаться для каждого типа данных */}
          <div className="text-center text-gray-500 dark:text-gray-400">
            {filteredTableData && columns && (
              <TableContainer<EntityTableRowMap[T]>
                tableData={filteredTableData}
                columns={columns}
                handelChangeFormData={handelChangeFormData}
                isLoading={isLoading && !modalState?.isOpen}
              />
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно - используем адаптивное */}
      <AdaptiveModalContainer
        modalTitle={getModalTitle(modalState.type, entityType)}
        isOpen={modalState.isOpen}
        onClose={closeModal}
      >
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          primaryAction={
            primaryActionButton
              ? primaryActionButton(modalState.type)
              : {
                  text: modalState.type === "new" ? "Создать" : "Сохранить",
                  type: "submit",
                }
          }
          secondaryAction={
            secondaryActionButton && modalState.type === "edit"
              ? secondaryActionButton(modalState.type, modalState.modalId)
              : {
                  text: "Отмена",
                  onClick: closeModal,
                }
          }
        >
          <div className="grid grid-cols-1 gap-4">
            <FormComponent register={register} errors={errors} />
          </div>
        </FormWrapper>
      </AdaptiveModalContainer>
    </>
  );
};
