"use client";

import { useEffect, useState, useCallback } from "react";

import { TableContainer } from "@/components/shared/TableContainer/TableContainer";

import {
  ColumnDefinition,
  EntityFormMap,
  EntityTableRowMap,
  EntityType,
} from "@/utils/types";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { useLoaderStore } from "@/store/useLoaderStore";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { SearchIcon } from "@/styles/icons";
// import { AdaptiveModalContainer } from "@/components/shared/ModalContainer/AdaptiveModalContainer";
// import { ClientForm } from "../ClientForm/ClientForm";
import { useModalStore } from "@/store/modalStore";

// type ColumnDefinition<T> = {
//   key: string;
//   label: string;
//   render?: (value: number | string, row: T) => React.ReactNode;
// };

interface EntityPageContainerProps<T extends EntityType> {
  entityType: T;
  pageTitle: string;
  requestLink?: string;
  updateTableData?: () => void;
  tableData?: EntityTableRowMap[T][];
  modalTargetText: (type: string) => string;
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
  // formComponent: React.FC<{
  //   register: UseFormRegister<EntityFormMap[T]>;
  //   errors: FieldErrors<EntityFormMap[T]>;
  // }>;
  // formComponent: React.FC;
  extraContent?: React.ReactNode;
}

export const EntityPageContainer = <T extends EntityType>({
  entityType,
  // formComponent: FormComponent,
  requestLink = undefined,
  tableData,
  updateTableData,
  primaryActionButton,
  secondaryActionButton,
  columns,
  modalTargetText,
  pageTitle,
}: EntityPageContainerProps<T>) => {
  // const [modalState, setModalState] = useState<{
  //   isOpen: boolean;
  //   type: "new" | "edit";

  //   modalId: number | undefined;
  // }>({
  //   isOpen: false,
  //   type: "new",
  //   modalId: undefined,
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<EntityFormMap[T]>();

  const { isLoading, startLoading, stopLoading } = useLoaderStore();

  const { isOpenModal, openModal, modalType, closeModal } = useModalStore();

  const [searchParams, setSearchParams] = useState<string>("");

  const [filteredTableData, setFilteredTableData] = useState<
    EntityTableRowMap[T][]
  >(tableData || []);

  // Вынести отдельно потом
  // const onSubmit = useCallback<SubmitHandler<EntityFormMap[T]>>(
  //   async (data) => {
  //     alert(1213);
  //     console.log("debig", modalType);

  //     if (!requestLink) return;
  //     try {
  //       startLoading();
  //       let response;

  //       if (modalType === "new") {
  //         response = await new FetchService().POST(requestLink, data).send();
  //       } else if (modalType === "edit") {
  //         response = await new FetchService()
  //           .PUT(`${requestLink}/${data.id}`, data)
  //           .send();
  //       } else {
  //         throw new Error("Неизвестный тип операции");
  //       }

  //       const { success, message } = response;

  //       enqueueSnackbar(message, { variant: success ? "success" : "error" });

  //       if (success) {
  //         closeModal();
  //         if (updateTableData) updateTableData();
  //       }
  //       stopLoading();
  //     } catch (error) {
  //       console.error(error);
  //       enqueueSnackbar("Ошибка при создании", { variant: "error" });
  //     }
  //   },
  //   [modalType, ]
  // );

  useEffect(() => {
    console.log("debig", modalType);
  }, [modalType]);

  // const openModal = (type: "new" | "edit", id?: number) => {
  //   reset({} as EntityFormMap[T]);
  //   setModalState({
  //     isOpen: true,
  //     type,
  //     modalId: id,
  //   });
  // };

  // const closeModal = () => {
  //   reset({} as EntityFormMap[T]);
  //   setModalState((prev) => ({ ...prev, isOpen: false }));
  // };

  const handelChangeFormData = (data: EntityFormMap[T]) => {
    // openModal("edit", data.id);
    console.log("2222222", data, modalType);
    openModal({
      formFieldKey: entityType,
      title: modalTargetText("edit"),
      modalType: "edit",
      modalId: data.id,
      requestLink: requestLink,
      // onSubmit: onSubmit,
      primaryAction: primaryActionButton
        ? primaryActionButton("edit")
        : undefined,
      secondaryAction: secondaryActionButton
        ? secondaryActionButton("edit", data.id)
        : undefined,
      formData: data,
    });

    // reset(data);
  };

  useEffect(() => {
    if (updateTableData) updateTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Отключаем правило eslint, так как функция стабильна

  useEffect(() => {
    setFilteredTableData(tableData || []);
  }, [tableData]);

  const searchData = useCallback(
    (data: EntityTableRowMap[T][], searchText: string) => {
      if (!searchText.trim()) return data || [];
      if (!data) return [];

      const searchLower = searchText.toLowerCase();

      return data.filter((item) =>
        columns.some((column) => {
          const fieldValue = item[column.key as keyof EntityTableRowMap[T]];
          return fieldValue?.toString().toLowerCase().includes(searchLower);
        })
      );
    },
    [columns]
  );

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
            onClick={() => {
              openModal({
                formFieldKey: entityType,
                requestLink: requestLink,
                // onSubmit: onSubmit,
                title: modalTargetText("new"),
                modalType: "new",
                primaryAction: primaryActionButton
                  ? primaryActionButton("new")
                  : undefined,
                secondaryAction: secondaryActionButton
                  ? secondaryActionButton("new", undefined)
                  : undefined,
                formData: {} as EntityFormMap[T],
              });
            }}
            variant="primary"
            disabled={isLoading}
            label={modalTargetText("new")}
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
                isLoading={isLoading && !isOpenModal}
              />
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {/* <AdaptiveModalContainer
        modalTitle={getModalTitle(modalType, entityType)}
        isOpen={isOpenModal}
        onClose={closeModal}
      >
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          primaryAction={
            primaryActionButton
              ? primaryActionButton(modalType)
              : {
                  text: modalType === "new" ? "Создать" : "Сохранить",
                  type: "submit",
                }
          }
          secondaryAction={
            secondaryActionButton && modalType === "edit"
              ? secondaryActionButton(modalType, modalId)
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
      </AdaptiveModalContainer> */}
    </>
  );
};
