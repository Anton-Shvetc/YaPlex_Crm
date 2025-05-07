"use client";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { Client, ColumnDefinition } from "@/utils/types";

export default function ClientsPage() {
  const { clients, setClients } = useClientStore();

  const { startLoading, stopLoading } = useLoaderStore();

  const updateTableData = () => {
    getParamsData<Client>("api/clients", setClients, { startLoading, stopLoading } );
  };

  const clientTableColumns: ColumnDefinition<Client>[] = [
    { key: "name", label: "Имя" },
    { key: "company", label: "Компания" },
    { key: "website", label: "Сайт" },
    {
      key: "is_active",
      label: "Статус",
      render: (value: number | string) =>
        value === 1 ? "Активен" : "Неактивен",
    },
  ];

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
      formComponent={ClientForm}
    />
  );
}
