"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { DealForm } from "@/components/feature/DealForm/DealForm";
import { Client, ColumnDefinition, Deal } from "@/utils/types";
import { useDealsStore } from "@/store/dealsStore";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useClientStore } from "@/store/clientStore";

export default function DealsPage() {
  const { deals, setDeals } = useDealsStore();
  const dealsTableColumns: ColumnDefinition<Deal>[] = [
    { key: "name", label: "Название" },
    { key: "company", label: "Компания" },
  ];

  const { setClients } = useClientStore();

  const { startLoading, stopLoading } = useLoaderStore();

  const updateTableData = () => {

    // TODO - для данного случая вынести обработку лодера вне функции, добавить Promise.all
    getParamsData<Client>("api/clients", setClients, {
      startLoading,
      stopLoading,
    });
    getParamsData<Deal>("api/deals", setDeals, { startLoading, stopLoading });
  };

  return (
    <EntityPageContainer
      entityType="deal"
      pageType="deals"
      actionButtonText="Новая сделка"
      requestLink="api/deals"
      pageTitle="Сделки"
      tableData={deals}
      columns={dealsTableColumns}
      updateTableData={updateTableData}
      formComponent={DealForm}
    />
  );
}
