import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";
import { MainPageClientCard } from "@/components/ui/MainPageCards/MainPageClientCard";
import { MainPageTaskCard } from "@/components/ui/MainPageCards/MainPageTaskCard";
import { MainPageDealCard } from "@/components/ui/MainPageCards/MainPageDealCard";

import {
  ColumnDefinition,
  StatisticsI,
  MainPageInfoDesktopI,
} from "@/utils/types";
import { useMemo } from "react";
import { useLoaderStore } from "@/store/useLoaderStore";

export const MainPageInfoDesktop = ({
  params,
}: {
  params: MainPageInfoDesktopI;
}) => {
  const { statisticsTableData, clients, deals, tasks } = params;

  const { isLoading } = useLoaderStore();

  const statisticsColumns: ColumnDefinition<StatisticsI>[] = useMemo(
    () => [
      {
        key: "name",
        label: "",
        render: (value: number | string) => (
          <span style={{ fontWeight: 700 }}>{value}</span>
        ),
      },
      {
        key: "on_today",
        label: "на сегодня",
        render: (value: number | string) => (
          <span className="text-blue-500 font-bold">{value}</span>
        ),
      },
      {
        key: "today",
        label: "за сегодня",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
      {
        key: "week",
        label: "за неделю",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
      {
        key: "month",
        label: "за месяц",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
      {
        key: "quarter",
        label: "за квартал",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
    ],
    []
  );

  return (
    <div className="hidden md:flex flex-col gap-10">
      {statisticsTableData && (
        <TableContainer<StatisticsI>
          tableData={statisticsTableData}
          columns={statisticsColumns}
          isLoading={isLoading}
        />
      )}

      <MainPageInfoContainer title="Топ 10 активных клиентов">
        {clients?.length > 0
          ? clients?.map((client) => (
              <MainPageClientCard
                key={client?.id}
                name={client.name}
                company={client.company}
                dealsCount={client?.dealsCount}
              />
            ))
          : null}
      </MainPageInfoContainer>

      <MainPageInfoContainer title="Топ 10 активных сделок" isGrid={false}>
        {deals?.length
          ? deals.map((deal) => {
              const clientName =
                clients.find((client) => client?.id === deal?.clientId)?.name ||
                undefined;

              return (
                <MainPageDealCard
                  key={deal?.id}
                  name={deal.name}
                  status={deal.status}
                  clientName={clientName}
                  amount={deal?.amount}
                  created_at={deal?.created_at}
                />
              );
            })
          : null}
      </MainPageInfoContainer>
      <MainPageInfoContainer title="Последние 10 задач">
        {tasks?.length > 0
          ? tasks?.map((task) => (
              <MainPageTaskCard
                key={task?.id}
                name={task.name}
                deal={
                  deals?.find((el) => el?.id === task.dealId)?.name || undefined
                }
                deadline={task?.deadline}
                status={task?.status}
              />
            ))
          : null}
      </MainPageInfoContainer>
    </div>
  );
};
