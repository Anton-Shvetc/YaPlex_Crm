import { ColumnDefinition } from "@/utils/types";
import { Loader } from "../Loader";
import { getTableRowClasses } from "@/utils/ui/getTableRowClass";
import { useState } from "react";
import { DateTime } from "luxon";

interface TableContainerProps<T> {
  tableData: T[];
  columns: ColumnDefinition<T>[];
  handelChangeFormData?: (data: T) => void;
  isLoading?: boolean;
  pagination?: boolean; // Флаг для включения пагинации
  pageSize?: number; // Количество строк на странице
  noDataText?: string;
}

export const TableContainer = <T extends object>({
  tableData,
  columns,
  handelChangeFormData,
  isLoading = false,
  pagination = false,
  pageSize = 5,
  noDataText = "Нет данных",
}: TableContainerProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="grid place-items-center h-48">
        <Loader />
      </div>
    );
  }

  if (!columns || tableData?.length === 0) {
    return (
      <div className="grid place-items-center dark:text-[#fff]">
        <p>{noDataText}</p>
      </div>
    );
  }

  // Логика пагинации
  const totalPages = Math.ceil(tableData.length / pageSize);
  const paginatedData = pagination
    ? tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : tableData;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-4">
      <table className="w-full border-separate border-spacing-y-1.5">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="p-2 text-left dard:text-white text-gray-400 text-xs font-medium"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: T, rowIndex: number) => {
            let rowClasses = getTableRowClasses();
            let status: string | undefined =
              "is_active" in row && !row.is_active ? "isNotActive" : undefined;

            if ("status" in row && typeof row.status === "string")
              status = row.status;

            if ("deadline" in row && typeof row.deadline === "string") {
              const deadline = DateTime.fromISO(row.deadline.toString());
              const now = DateTime.now();
              status = deadline < now ? "Просрочена" : status;
            }

            rowClasses = getTableRowClasses(status);

            return (
              <tr
                key={rowIndex}
                onClick={() =>
                  handelChangeFormData && handelChangeFormData(row)
                }
                className={rowClasses}
              >
                {columns.map((column) => {
                  const value = row[column.key as keyof T] as string | number;
                  return (
                    <td
                      key={String(column.key)}
                      className="p-2 text-left dark:text-white first:rounded-l-lg last:rounded-r-lg"
                    >
                      {column.render
                        ? column.render(value, row)
                        : value != null
                        ? String(value)
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-gray-100 px-3 py-1 rounded border disabled:opacity-50"
          >
            Назад
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded text-sm
            ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "border border-gray-300 dark:text-[#fff] hover:bg-gray-100"
            }
            transition-colors`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-gray-100 px-3 py-1 rounded border disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};
