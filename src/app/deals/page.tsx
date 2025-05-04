"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { DealFormData } from "@/components/feature/DealForm/DealForm";

export default function DealsPage() {
  const sampleDeal: DealFormData = {
    name: "Заключение договора",
    client: "Ilya B",
    amount: "50 000 ₽",
    status: "В работе",
    description: "Подготовка финальных условий для долгосрочного контракта.",
  };

  return (
    <EntityPageContainer
      entityType="deal"
      pageType="deals"
      sampleData={sampleDeal}
    />
  );
} 