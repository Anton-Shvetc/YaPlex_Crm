"use client";
import { ReportTableContainer } from "@/components/shared/ReportTableContainer/ReportTableContainer";
import { useClientStore } from "@/store/clientStore";

import { formatDate } from "@/utils/formatters";
import { Client, ColumnDefinition } from "@/utils/types";
import { useMemo } from "react";

export const ClientReport = () => {
  const { clients } = useClientStore();

 

  const newClientColumn: ColumnDefinition<Client>[] = useMemo(
    () => [
      {
        label: "ID клиента",
        key: "id",
        //   render: (value: number | string) => (
        //     <span style={{ fontWeight: 700 }}>{value}</span>
        //   ),
      },
      { key: "name", label: "Имя клиента" },
      { key: "company", label: "Компания" },
      {
        key: "created_at",
        label: "Добавлен",
        render: (value: number | string) => (
          <span>{formatDate(value.toString())}</span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <ReportTableContainer<Client>
        reportTitle="Новые клиенты"
        tableData={clients.filter((client) => client?.is_active)}
        columns={newClientColumn}
      />
    </div>
  );
};
