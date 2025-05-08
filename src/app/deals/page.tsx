"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { DealForm } from "@/components/feature/DealForm/DealForm";
import { Client, ColumnDefinition, Deal } from "@/utils/types";
import { useDealsStore } from "@/store/dealsStore";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useClientStore } from "@/store/clientStore";
import { useMemo } from "react";

export default function DealsPage() {
  const { deals, setDeals } = useDealsStore();
  const { clients, setClients } = useClientStore();

  const dealsTableColumns: ColumnDefinition<Deal>[] = useMemo(
    () => [
      { key: "name", label: "Название" },

      {
        key: "clientId",
        label: "Клиент",
        render: (value: number | string) =>
          clients.find((el) => el?.id === Number(value))?.name,
      },

      { key: "description", label: "Описание" },
      { key: "status", label: "Этап(стутс)" },
      { key: "amount", label: "Сумма" },
      { key: "created_at", label: "Дата создания" },
    ],
    [clients]
  );

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
