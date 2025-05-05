"use client";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  website: string;
  email: string;
  comment: string;
};

export default function ClientsPage() {
  return (
    <EntityPageContainer
      entityType="client"
      pageType="clients"
      actionButtonText="Новый клиент"
      requestLink="api/clients"
      pageTitle="Клиенты"
      formComponent={ClientForm}
    />
  );
}
