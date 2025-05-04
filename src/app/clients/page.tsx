"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { ClientFormData } from "@/components/feature/ClientForm/ClientForm";

export default function ClientsPage() {
  const sampleClient: ClientFormData = {
    name: "Ilya B",
    phone: "+7 XXX XXX XXXX",
    company: "YaPlex_CRM",
    email: "ilya@yandex.ru",
    website: "www.yandex.ru",
    comment: "Комментарий",
  };

  return (
    <EntityPageContainer
      entityType="client"
      pageType="clients"
      sampleData={sampleClient}
    />
  );
} 