"use client";

import { Client, Deal, StatisticsI, Task, UserI } from "@/utils/types";

import { useEffect } from "react";
import { getParamsData } from "@/services/getParamsData";
import { useLoaderStore } from "@/store/useLoaderStore";

// import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";
// import { TableContainer } from "@/components/shared/TableContainer/TableContainer";
// import { MainPageClientCard } from "@/components/ui/MainPageCards/MainPageClientCard";
// import { MainPageTaskCard } from "@/components/ui/MainPageCards/MainPageTaskCard";
// import { MainPageDealCard } from "@/components/ui/MainPageCards/MainPageDealCard";
import { useStatisticsStore } from "@/store/statisticsStore";
import { useUserStore } from "@/store/userStore";
import { getSingleData } from "@/services/getSingleData";
import { Loader } from "@/components/shared/Loader";

import { useClientStore } from "@/store/clientStore";
import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";
import { MainPageInfoDesktop } from "@/components/feature/MainPageInfo/MainPageInfoDesktop";
import { MainPageInfoMobile } from "@/components/feature/MainPageInfo/MainPageInfoMobile";

// import { useForm } from "react-hook-form";
// import { useModalStore } from "@/store/modalStore";

export default function Home() {
  const { user, setUser } = useUserStore();
  const { clients, setClients } = useClientStore();
  const { deals, setDeals } = useDealsStore();
  const { tasks, setTasks } = useTasksStore();

  const { statisticsTableData, setStatisticsTableData } = useStatisticsStore();
  const { isLoading, startLoading, stopLoading } = useLoaderStore();

  // const [modalState, setModalState] = useState<{
  //   isOpen: boolean;
  //   type: "new" | "edit";

  //   modalId: number | undefined;
  // }>({
  //   isOpen: false,
  //   type: "new",
  //   modalId: undefined,
  // });

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

  return (
    <div className="items-center justify-items-center p-6 gap-16  font-[family-name:var(--font-geist-sans)]">
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

            <MainPageInfoDesktop
              params={{
                statisticsTableData,
                clients,
                deals,
                tasks,
              }}
            />
            <MainPageInfoMobile />
          </>
        )}
      </div>
    </div>
  );
}
