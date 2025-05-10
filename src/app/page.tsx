"use client";

import {
  Client,
  ColumnDefinition,
  Deal,
  StatisticsI,
  Task,
} from "@/utils/types";
import { useClientStore } from "@/store/clientStore";

import { useEffect, useMemo, useState } from "react";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";

import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";

import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";
import { MainPageClientCard } from "@/components/ui/MainPageCards/MainPageClientCard";

export default function Home() {
  const { clients, setClients } = useClientStore();
  const { setDeals } = useDealsStore();
  const { setTasks } = useTasksStore();

  const [statisticsTableData, setStatisticsTableData] =
    useState<StatisticsI[]>();

  const { isLoading, startLoading, stopLoading } = useLoaderStore();

  const statisticsColumns: ColumnDefinition<StatisticsI>[] = useMemo(
    () => [
      {
        key: "name",
        label: "",
        render: (value: number | string) => (
          <span style={{ fontWeight: 700 }}>{value}</span>
        ),
        // render: (value: number | string) =>
        //   clients.find((el) => el?.id === Number(value))?.name,
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

  useEffect(() => {
    const fetchData = async () => {
      startLoading();

      try {
        await Promise.all([
          getParamsData<StatisticsI>("api/statistics", setStatisticsTableData),
          getParamsData<Client>("api/clients?limits=10", setClients),
          getParamsData<Deal>("api/deals?limits=10", setDeals),
          getParamsData<Task>("api/tasks?limits=10", setTasks),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Отключаем правило eslint, так как эти функции стабильны (из zustand store)

  useEffect(() => {
    console.log("statisticsTableData", statisticsTableData);
  }, [statisticsTableData]);

  return (
    <>
      <div className=" items-center justify-items-center min-h-screen p-6 gap-16  font-[family-name:var(--font-geist-sans)]">
        <div className=" justify-between w-full">
          <div className="flex flex-col justify-center text-gray-800 dark:text-white text-xl font-semibold">
            Главная страница
          </div>

          <div className="flex flex-col gap-10">
            {statisticsTableData && (
              <TableContainer<StatisticsI>
                tableData={statisticsTableData}
                columns={statisticsColumns}
                isLoading={isLoading}
              />
            )}

            <MainPageInfoContainer title="Топ 10 активных клиентов">
              {clients?.map((client) => (
                <MainPageClientCard
                  key={client?.id}
                  name={client.name}
                  company={client.company}
                  dealsCount={client?.dealsCount}
                />
              ))}
            </MainPageInfoContainer>

            <MainPageInfoContainer title="Топ 10 активных сделок" />
            <MainPageInfoContainer title="Последние 10 задач" />
          </div>
        </div>
      </div>
    </>
  );
}
