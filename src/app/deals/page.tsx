"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";

import { Client, ColumnDefinition, Deal } from "@/utils/types";
import { useDealsStore } from "@/store/dealsStore";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useClientStore } from "@/store/clientStore";
import { useMemo } from "react";
import { getStatusColor } from "@/utils/ui/getStatusColor";
import { formatDate } from "@/utils/formatters";
import { useModalStore } from "@/store/modalStore";

export default function DealsPage() {
  const { deals, setDeals } = useDealsStore();
  const { clients, setClients } = useClientStore();

  const { closeModal } = useModalStore();

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
      {
        key: "status",
        label: "Этап (статус)",
        render: (value: number | string) => (
          <span className={getStatusColor(value.toString())}>{value}</span>
        ),
      },
      { key: "amount", label: "Сумма" },
      {
        key: "created_at",
        label: "Дата создания",
        render: (value: number | string) => (
          <span>{formatDate(value.toString())}</span>
        ),
      },
      {
        key: "finish_at",
        label: "Дата завершения",
        render: (value: number | string) => (
          <span>{value?.toString() ? formatDate(value.toString()) : "-"}</span>
        ),
      },
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

  // const finishedDeal = (id: number | undefined) => {
  //   if (id) {
  //     alert("finished");
  //   }
  // };

  return (
    <EntityPageContainer
      entityType="deal"
      modalTargetText={(modalType: string) =>
        modalType === "new" ? "Новая сделка" : "Карточка сделки"
      }
      requestLink="api/deals"
      pageTitle="Сделки"
      tableData={deals}
      columns={dealsTableColumns}
      updateTableData={updateTableData}
      primaryActionButton={(modalType: string) => ({
        text: modalType === "new" ? "Создать" : "Редактировать",
        type: "submit",
        varinat: "submit",
        // onClick: () => {},
      })}
      secondaryActionButton={() => ({
        // text: modalType === "new" ? "Отмена" : "Закрыть сделку",
        text: "Отмена",
        variant: "finish",
        type: "button",
        // onClick: () => (modalType === "new" ? closeModal() : finishedDeal(id)),
        onClick: () => closeModal(),
      })}
    />
  );
}
