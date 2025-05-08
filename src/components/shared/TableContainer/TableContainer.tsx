import { useLoaderStore } from "@/store/useLoaderStore";
import { ColumnDefinition } from "@/utils/types";
import { Loader } from "../Loader";

interface TableContainerProps<T> {
  tableData: T[]; // Массив данных
  columns: ColumnDefinition<T>[]; // Конфигурация колонок
  handelChangeFormData?: (data: T) => void; // Функция для обновления данных
}

// Компонент с типизацией
export const TableContainer = <T extends object>({
  tableData,
  columns,
  handelChangeFormData,
}: TableContainerProps<T>) => {
  const { isLoading } = useLoaderStore();

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
          // Базовые классы строки
          let rowClasses =
            "rounded-lg border cursor-pointer shadow-md shadow-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors cursor-pointer dark:shadow-none";

          // Обработка isActive
          if ("is_active" in row && !row.is_active) {
            rowClasses =
              "rounded-lg bg-rose-50 text-gray-300 hover:bg-rose-100 transition-colors cursor-pointer";
          }

          // Обработка статусов
          switch ("status" in row && row.status) {
            case "success":
              rowClasses =
                "rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer";
              break;
            case "warning":
              rowClasses =
                "rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer";
              break;
            case "error":
              rowClasses =
                "rounded-lg bg-red-50 text-red-800 hover:bg-red-100 transition-colors cursor-pointer";
              break;
          }

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
