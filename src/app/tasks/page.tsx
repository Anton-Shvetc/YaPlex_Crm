"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { TaskForm } from "@/components/feature/TaskForm/TaskForm";
import { getParamsData } from "@/services/getParamsData";

import { useDealsStore } from "@/store/dealsStore";
import { useTasksStore } from "@/store/tasksStore";
import { useLoaderStore } from "@/store/useLoaderStore";

import { ColumnDefinition, Deal, Task } from "@/utils/types";

export default function TasksPage() {
  const { tasks, setTasks } = useTasksStore();

  const { setDeals } = useDealsStore();

  const { startLoading, stopLoading } = useLoaderStore();

  const tasksTableColumns: ColumnDefinition<Task>[] = [
    { key: "name", label: "Название" },
    { key: "description", label: "Описание" },
  ];

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
      pageType="tasks"
      actionButtonText="Новая задача"
      requestLink="api/tasks"
      pageTitle="Задачи"
      tableData={tasks}
      columns={tasksTableColumns}
      updateTableData={updateTableData}
      formComponent={TaskForm}
    />
  );
}
