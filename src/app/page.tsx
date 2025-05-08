"use client";

import { useRouter } from "next/navigation";
// import { enqueueSnackbar } from "notistack";

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
import { ModalContainer } from "@/components/shared/ModalContainer/ModalContainer";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";

import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";

// import { useEffect } from "react";

export default function Home() {
  const { setClients } = useClientStore();
  const { setDeals } = useDealsStore();
  const { setTasks } = useTasksStore();

  const [statisticsTableData, setStatisticsTableData] =
    useState<StatisticsI[]>();

  const { isLoading, startLoading, stopLoading } = useLoaderStore();

  // Заменить на расчитываемые данные
  const mockData = [
    {
      name: "Клиенты",
      on_today: 123,
      today: 123,
      week: 123,
      month: 123,
      quarter: 123,
    },
    {
      name: "Активные сделки",
      on_today: 123,
      today: 123,
      week: 123,
      month: 123,
      quarter: 123,
    },
    {
      name: "Завершенные сделки",
      on_today: 123,
      today: 2,
      week: 3,
      month: 5,
      quarter: 123,
    },
  ];

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
          getParamsData<any>("api/statistics", setStatisticsTableData),
          getParamsData<Client>("api/clients", setClients),
          getParamsData<Deal>("api/deals", setDeals),
          getParamsData<Task>("api/tasks", setTasks),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, []);

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

            <MainPageInfoContainer title="Топ 10 активных клиентов" />
            <MainPageInfoContainer title="Топ 10 активных сделок" />
            <MainPageInfoContainer title="Последние 10 задач" />
          </div>
        </div>
      </div>
    </>
  );
}
