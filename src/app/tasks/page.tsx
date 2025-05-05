"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { TaskForm } from "@/components/feature/TaskForm/TaskForm";

export default function TasksPage() {
  return (
    <EntityPageContainer
      entityType="task"
      pageType="tasks"
      actionButtonText="Новая задача"
      pageTitle="Задачи"
      formComponent={TaskForm}
    />
  );
}
