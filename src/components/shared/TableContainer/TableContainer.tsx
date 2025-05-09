import { ColumnDefinition } from "@/utils/types";
import { Loader } from "../Loader";
import { getTableRowClasses } from "@/utils/ui/getTableRowClass";

interface TableContainerProps<T> {
  tableData: T[]; // Массив данных
  columns: ColumnDefinition<T>[]; // Конфигурация колонок
  handelChangeFormData?: (data: T) => void; // Функция для обновления данных
  isLoading?: boolean; // Флаг загрузки данных
}

// Компонент с типизацией
export const TableContainer = <T extends object>({
  tableData,
  columns,
  handelChangeFormData,
  isLoading = false,
}: TableContainerProps<T>) => {
  if (isLoading) {
    return (
      <div className="grid place-items-center h-48">
        <Loader />
      </div>
    );
  }

  if (!columns || tableData?.length === 0) {
    return (
      <div className="grid place-items-center ">
        <p>Нет данных</p>
      </div>
    );
  }

  return (
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
        {tableData.map((row: T, rowIndex: number) => {
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
  );
};
