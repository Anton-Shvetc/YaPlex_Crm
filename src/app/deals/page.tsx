"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { DealForm } from "@/components/feature/DealForm/DealForm";

export default function DealsPage() {
  return (
    <EntityPageContainer
      entityType="deal"
      pageType="deals"
      actionButtonText="Новвя сделка"
      pageTitle="Сделки"
      formComponent={DealForm}
    />
  );
}
