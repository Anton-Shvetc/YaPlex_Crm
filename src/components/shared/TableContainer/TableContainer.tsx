import { ColumnDefinition } from "@/utils/types";
import { Loader } from "../Loader";
import { getTableRowClasses } from "@/utils/ui/getTableRowClass";
import { useState } from "react";

interface TableContainerProps<T> {
  tableData: T[];
  columns: ColumnDefinition<T>[];
  handelChangeFormData?: (data: T) => void;
  isLoading?: boolean;
  pagination?: boolean; // Флаг для включения пагинации
  pageSize?: number; // Количество строк на странице
}

export const TableContainer = <T extends object>({
  tableData,
  columns,
  handelChangeFormData,
  isLoading = false,
  pagination = false,
  pageSize = 5,
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
      <div className="grid place-items-center">
        <p>Нет данных</p>
      </div>
    );
  }

  // Логика пагинации
  const totalPages = Math.ceil(tableData.length / pageSize);
  const paginatedData = pagination
    ? tableData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
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
                className="p-2 text-left text-gray-400 text-xs font-medium"
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

            rowClasses = getTableRowClasses(status);

            return (
              <tr
                key={rowIndex}
                onClick={() => handelChangeFormData && handelChangeFormData(row)}
                className={rowClasses}
              >
                {columns.map((column) => {
                  const value = row[column.key as keyof T] as string | number;
                  return (
                    <td
                      key={String(column.key)}
                      className="p-2 first:rounded-l-lg last:rounded-r-lg"
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

      {pagination && tableData.length > pageSize && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Назад
          </button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};