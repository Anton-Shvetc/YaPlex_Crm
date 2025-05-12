"use client";
import { ClientReport } from "@/components/feature/Reports/ClientsReport";
import { SalesReport } from "@/components/feature/Reports/SalesReport";
import { TasksReport } from "@/components/feature/Reports/TesksReport";
import { PageContainer } from "@/components/shared/PageContainer";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function ClientsPage() {
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
          <TabPanel className="rounded-xl bg-white p-3">
            <SalesReport />
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3">
            <ClientReport />{" "}
          </TabPanel>

          <TabPanel className="rounded-xl bg-white p-3">
            <TasksReport />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </PageContainer>
  );
}
