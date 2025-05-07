"use client";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { Client } from "@/utils/types";



export default function ClientsPage() {

  const { clients, setClients } = useClientStore();

  const updateTableData = () => {
    getParamsData<Client>("api/clients", setClients);
  }

  type ColumnDefinition<T> = {
    key:string;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
  };

  const clientTableColumns: ColumnDefinition<Client>[] = [
    {key: "name", label: "Имя"},
    {key: "company", label: "Компания"},
    {key: "website", label: "Сайт"},
    { 
      key: "is_active", 
      label: "Статус",
      render: (value: number | string) => value === 1 ? "Активен" : "Неактивен"
    },
    { 
      key: "company", 
      label: "Компания",
      render: (value: number | string) => <strong>{value}</strong>
    }
  ]


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
