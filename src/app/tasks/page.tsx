"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { TaskForm } from "@/components/feature/TaskForm/TaskForm";
import { getParamsData } from "@/services/getParamsData";
import { useTasksStore } from "@/store/tasksStore";

import { ColumnDefinition, Task } from "@/utils/types";

export default function TasksPage() {

    const { tasks, setTasks } = useTasksStore();
    const tasksTableColumns: ColumnDefinition<Task>[] = [
      { key: "name", label: "Название" },
      { key: "description", label: "Описание" },
    ];
  
    const updateTableData = () => {
      getParamsData<Task>("api/tasks", setTasks);
    };

  return (
    <EntityPageContainer
      entityType="task"
      pageType="tasks"
      actionButtonText="Новая задача"
      pageTitle="Задачи"
      tableData={tasks}
      columns={tasksTableColumns}
      updateTableData={updateTableData}
      formComponent={TaskForm}
    />
  );
}
