"use client";
import { ReportTableContainer } from "@/components/shared/ReportTableContainer/ReportTableContainer";
import { useTasksStore } from "@/store/tasksStore";
import { ColumnDefinition, Task } from "@/utils/types";
import { useMemo } from "react";

import { DateTime } from "luxon";
import { formatDate } from "@/utils/formatters";
export const TasksReport = () => {
  const { tasks } = useTasksStore();

  const now = DateTime.now();

  const allSalesColumns: ColumnDefinition<Task>[] = useMemo(
    () => [
      {
        key: "id",
        label: "ID задачи",
      },
      { key: "name", label: "Название задачи" },

      {
        key: "executor",
        label: "Ответственный",
      },
      {
        key: "status",
        label: "Статус",

        render: (value, row) => {
          if ("deadline" in row && row.deadline) {
            const deadline = DateTime.fromISO(row.deadline.toString());

            if (!deadline.isValid) return <span>Неверная дата</span>;

            if (deadline < now)
              return (
                <span className="text-red-500 font-medium">Просрочено</span>
              );
          }
          return <span>{value || "—"}</span>;
        },
      },
      {
        key: "deadline",
        label: "Дата срока выполнения",
        render: (value: number | string) => (
          <span>{formatDate(value.toString())}</span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <ReportTableContainer<Task>
        reportTitle="Просроченные задачи"
        tableData={tasks.filter((task) => {
          const deadline = task?.deadline
            ? DateTime.fromISO(task?.deadline.toString())
            : null;
          if (!deadline) return false;

          return task?.deadline && deadline < now;
        })}
        columns={allSalesColumns}
        noDataText="Нет данных о просроченных задачах"
      />
    </div>
  );
};
