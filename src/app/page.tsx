"use client";

import { useRouter } from "next/navigation";
// import { enqueueSnackbar } from "notistack";

import { Client, Deal, Task } from "@/utils/types";
import { useClientStore } from "@/store/clientStore";

import { useEffect, useState } from "react";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";
import { ModalContainer } from "@/components/shared/ModalContainer/ModalContainer";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";

import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";

// import { useEffect } from "react";

export default function Home() {
  const { setClients } = useClientStore();
  const { setDeals } = useDealsStore();
  const { setTasks } = useTasksStore();

  const { isLoading, startLoading, stopLoading } = useLoaderStore();

  useEffect(() => {
    const fetchData = async () => {
      startLoading();

      try {
        await Promise.all([
          getParamsData<Client>("api/clients?limits=10", setClients),
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

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-center text-gray-800 dark:text-white text-xl font-semibold">
            Главная страница
          </div>

          <MainPageInfoContainer title="Топ 10 активных клиентов" />
          <MainPageInfoContainer title="Топ 10 активных сделок" />
          <MainPageInfoContainer title="Последние 10 задач" />
        </div>
      </div>
    </>
  );
}
