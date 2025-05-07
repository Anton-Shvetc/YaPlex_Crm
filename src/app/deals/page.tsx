"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { DealForm } from "@/components/feature/DealForm/DealForm";
import { ColumnDefinition, Deal } from "@/utils/types";
import { useDealsStore } from "@/store/dealsStore";
import { getParamsData } from "@/services/getParamsData";

export default function DealsPage() {
  const { deals, setDeals } = useDealsStore();
  const dealsTableColumns: ColumnDefinition<Deal>[] = [
    { key: "name", label: "Название" },
    { key: "company", label: "Компания" },
  ];

  const updateTableData = () => {
    getParamsData<Deal>("api/deals", setDeals);
  };

  return (
    <EntityPageContainer
      entityType="deal"
      pageType="deals"
      actionButtonText="Новая сделка"
      pageTitle="Сделки"
      tableData={deals}
      columns={dealsTableColumns}
      updateTableData={updateTableData}
      formComponent={DealForm}
    />
  );
}
