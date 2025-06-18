import { ReportTableContainer } from "@/components/shared/ReportTableContainer/ReportTableContainer";
import { useClientStore } from "@/store/clientStore";
import { useDealsStore } from "@/store/dealsStore";
import { formatDate } from "@/utils/formatters";
import { ColumnDefinition, Deal } from "@/utils/types";
import { useMemo } from "react";

export const SalesReport = () => {
  const { clients } = useClientStore();
  const { deals } = useDealsStore();

  const allSalesColumns: ColumnDefinition<Deal>[] = useMemo(
    () => [
      {
        label: "ID сделки",
        key: "id",
      },
      { key: "name", label: "Название" },

      {
        key: "clientId",
        label: "Клиент",
        render: (value: number | string) =>
          clients.find((el) => el?.id === Number(value))?.name,
      },
      { key: "amount", label: "Сумма" },
      {
        key: "finish_at",
        label: "Дата завершения",
        render: (value: number | string) => (
          <span>{value?.toString() ? formatDate(value.toString()) : "-"}</span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <ReportTableContainer<Deal>
        reportTitle="Общий, продажи"
        tableData={deals.filter((deal) => deal?.status === "Завершена")}
        columns={allSalesColumns}
        noDataText="Нет данных о завершенных сделках"
      />
    </div>
  );
};
