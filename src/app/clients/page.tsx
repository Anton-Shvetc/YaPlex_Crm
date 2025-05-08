"use client";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { deleteItem } from "@/services/deleteItem";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { Client, ColumnDefinition } from "@/utils/types";

export default function ClientsPage() {
  const { clients, setClients } = useClientStore();

  const { startLoading, stopLoading } = useLoaderStore();

  const updateTableData = () => {
    getParamsData<Client>("api/clients", setClients, {
      startLoading,
      stopLoading,
    });
  };

  const clientTableColumns: ColumnDefinition<Client>[] = [
    { key: "name", label: "Имя" },

    { key: "phone", label: "Телефон" },
    { key: "email", label: "Email" },
    { key: "company", label: "Название компании" },
    { key: "website", label: "Сайт" },
    { key: "comment", label: "Комментарий" },
    { key: "created_at", label: "Добавлен" },
    // {
    //   key: "is_active",
    //   label: "Статус",
    //   render: (value: number | string) =>
    //     value === 1 ? "Активен" : "Неактивен",
    // },
  ];

  const handleDelete = (id: number) => {
    if (id) {
      deleteItem({
        id: id,
        endpoint: "api/clients",
        onSuccess: () => updateTableData(),
        loaderMethods: {
          startLoading: startLoading,
          stopLoading: stopLoading,
        },
        successMessage: "Клиент успешно деактивирован",
        errorMessage: "Не удалось деактивировать клиента",
      });
    }
  };

  return (
    <EntityPageContainer
      entityType="client"
      pageType="clients"
      actionButtonText="Новый клиент"
      requestLink="api/clients"
      pageTitle="Клиенты"
      tableData={clients}
      columns={clientTableColumns}
      updateTableData={updateTableData}
      primaryActionButton={(modalType: string) => ({
        text: modalType === "new" ? "Создать" : "Редактировать",
        type: "submit",
        varinat: "submit",
        onClick: () => {},
      })}
      secondaryActionButton={(modalType: string, id: number) => ({
        text: modalType === "new" ? "Отмена" : "Удалить клиента",
        variant: "delete",
        type: "button",
        onClick: () => handleDelete(id),
      })}
      formComponent={ClientForm}
    />
  );
}
