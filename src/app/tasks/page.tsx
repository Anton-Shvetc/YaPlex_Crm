"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { TaskFormData } from "@/components/feature/TaskForm/TaskForm";

export default function TasksPage() {
  const sampleTask: TaskFormData = {
    name: "Встреча с клиентом",
    deal: "Проект CRM",
    description: "Сдать завершённую часть проекта в установленные сроки.",
    dueDate: "2025-05-12",
    assignee: "Антон, Борис",
    status: "В работе",
  };

  return (
    <EntityPageContainer
      entityType="task"
      pageType="tasks"
      sampleData={sampleTask}
    />
  );
} 