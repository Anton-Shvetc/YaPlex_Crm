"use client";
import { ClientReport } from "@/components/feature/Reports/ClientsReport";
import { SalesReport } from "@/components/feature/Reports/SalesReport";
import { TasksReport } from "@/components/feature/Reports/TasksReport";
import { PageContainer } from "@/components/shared/PageContainer";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { useDealsStore } from "@/store/dealsStore";
import { useTasksStore } from "@/store/tasksStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { Client, Deal, Task } from "@/utils/types";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect } from "react";

export default function ClientsPage() {
  const { startLoading, stopLoading } = useLoaderStore();
  const { setTasks } = useTasksStore();
  const { setDeals } = useDealsStore();
  const { setClients } = useClientStore();

  useEffect(() => {
    const fetchData = async () => {
      startLoading();

      try {
        await Promise.all([
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

  const tabList = [
    "Отчеты по продажам",
    "Отчеты по клиентам",
    "Отчеты по задачам",
  ];

  return (
    <PageContainer pageTitle="Отчеты">
      <TabGroup>
        {/* Переключатели (табы) */}
        <TabList className="flex space-x-4">
          {tabList.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-1 py-3 text-sm font-bold leading-5 focus:outline-none
                ${
                  selected
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-500 hover:border-b-2 hover:border-blue-300"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        {/* Контент табов */}
        <TabPanels className="mt-2">
          <TabPanel>
            <SalesReport />
          </TabPanel>
          <TabPanel>
            <ClientReport />{" "}
          </TabPanel>

          <TabPanel>
            <TasksReport />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </PageContainer>
  );
}
