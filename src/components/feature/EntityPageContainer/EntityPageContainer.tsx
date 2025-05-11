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

import { useModalStore } from "@/store/modalStore";

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
  const { isLoading } = useLoaderStore();

  const { isOpenModal, openModal } = useModalStore();

  const [searchParams, setSearchParams] = useState<string>("");

  const [filteredTableData, setFilteredTableData] = useState<
    EntityTableRowMap[T][]
  >(tableData || []);

  const handelChangeFormData = (data: EntityFormMap[T]) => {
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
  };

  useEffect(() => {
    if (updateTableData) updateTableData();
  }, []);

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
  }, [searchParams]);

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
    </>
  );
};
