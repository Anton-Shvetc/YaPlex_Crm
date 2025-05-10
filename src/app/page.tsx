"use client";

import {
  Client,
  ColumnDefinition,
  Deal,
  StatisticsI,
  Task,
  UserI,
} from "@/utils/types";
import { useClientStore } from "@/store/clientStore";

import { useEffect, useMemo } from "react";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";

import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";

import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";
import { MainPageClientCard } from "@/components/ui/MainPageCards/MainPageClientCard";
import { MainPageTaskCard } from "@/components/ui/MainPageCards/MainPageTaskCard";
import { MainPageDealCard } from "@/components/ui/MainPageCards/MainPageDealCard";
import { useStatisticsStore } from "@/store/statisticsStore";
import { useUserStore } from "@/store/userStore";
import { getSingleData } from "@/services/getSingleData";
import { Loader } from "@/components/shared/Loader";

export default function Home() {
  const { clients, setClients } = useClientStore();
  const { deals, setDeals } = useDealsStore();
  const { tasks, setTasks } = useTasksStore();
  const { user, setUser } = useUserStore();
  const { statisticsTableData, setStatisticsTableData } = useStatisticsStore();
  const { isLoading, startLoading, stopLoading } = useLoaderStore();

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

  useEffect(() => {
    const fetchData = async () => {
      startLoading();

      try {
        await Promise.all([
          getParamsData<StatisticsI>("api/statistics", setStatisticsTableData),
          getParamsData<Client>("api/clients?limits=10", setClients),
          getParamsData<Deal>("api/deals?limits=10", setDeals),
          getParamsData<Task>("api/tasks?limits=10", setTasks),
          getSingleData<UserI>("api/user/profile", setUser),
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
    <div className=" items-center justify-items-center p-6 gap-16  font-[family-name:var(--font-geist-sans)] ">
      <div className=" justify-between w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col justify-center text-gray-800 dark:text-white text-xl font-semibold">
              {`Добро пожаловать ${
                user?.firstName ? ",  " + user?.firstName : ""
              }`}
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

              <MainPageInfoContainer
                title="Топ 10 активных сделок"
                isGrid={false}
              >
                {deals?.length
                  ? deals.map((deal) => {
                      const clientName =
                        clients.find((client) => client?.id === deal?.clientId)
                          ?.name || undefined;

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
                          deals?.find((el) => el?.id === task.dealId)?.name ||
                          undefined
                        }
                        deadline={task?.deadline}
                        status={task?.status}
                      />
                    ))
                  : null}
              </MainPageInfoContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
