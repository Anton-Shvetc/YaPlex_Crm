"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { TaskForm } from "@/components/feature/TaskForm/TaskForm";
import { getParamsData } from "@/services/getParamsData";

import { useDealsStore } from "@/store/dealsStore";
import { useTasksStore } from "@/store/tasksStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { formatDate } from "@/utils/formatters";

import { ColumnDefinition, Deal, Task } from "@/utils/types";
import { useMemo } from "react";

export default function TasksPage() {
  const { tasks, setTasks } = useTasksStore();

  const { deals, setDeals } = useDealsStore();

  const { startLoading, stopLoading } = useLoaderStore();

  const tasksTableColumns: ColumnDefinition<Task>[] = useMemo(
    () => [
      { key: "name", label: "Название" },
      {
        key: "dealId",
        label: "Сделка",
        render: (value: number | string) =>
          deals.find((el) => el?.id === Number(value))?.name,
      },
      { key: "description", label: "Описание" },

      {
        key: "deadline",
        label: "Выполнить до",
        render: (value: number | string) => (
          <span>{formatDate(value.toString())}</span>
        ),
      },
      { key: "executor", label: "Исполнитель" },
      { key: "status", label: "Статус" },

      {
        key: "created_at",
        label: "Дата создания",
        render: (value: number | string) => (
          <span>{formatDate(value.toString())}</span>
        ),
      },
    ],
    [deals]
  );

  const updateTableData = () => {
    getParamsData<Deal>("api/deals", setDeals, {
      startLoading,
      stopLoading,
    });
    getParamsData<Task>("api/tasks", setTasks, { startLoading, stopLoading });
  };

  return (
    <EntityPageContainer
      entityType="task"
      modalTargetText={(modalType: string) =>
        modalType === "new" ? "Новая сделка" : "Карточка задачи"
      }
      requestLink="api/tasks"
      pageTitle="Задачи"
      tableData={tasks}
      columns={tasksTableColumns}
      updateTableData={updateTableData}
      primaryActionButton={(modalType: string) => ({
        text: modalType === "new" ? "Создать" : "Редактировать",
        type: "submit",
        varinat: "submit",
      })}
      // secondaryActionButton={(modalType: string, id: number | undefined) => ({
      //   text: modalType === "new" ? "Отмена" : "Удалить клиента",
      //   variant: "delete",
      //   type: "button",
      //   // onClick: () => (modalType === "new" ? closeModal() : finishedDeal(id)),
      // })}
    />
  );
}
