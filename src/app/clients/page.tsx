"use client";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { Client } from "@/utils/types";

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  website: string;
  email: string;
  comment: string;
};

export default function ClientsPage() {

  const { clients, setClients } = useClientStore();

  const updateTableData = () => {
    getParamsData<Client>("api/clients", setClients);
  }


  return (
    <EntityPageContainer
      entityType="client"
      pageType="clients"
      actionButtonText="Новый клиент"
      requestLink="api/clients"
      pageTitle="Клиенты"
      tableData={clients}
      updateTableData={updateTableData}
      formComponent={ClientForm}
    />
  );
}
