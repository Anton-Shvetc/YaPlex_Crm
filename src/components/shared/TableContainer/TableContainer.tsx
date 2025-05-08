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
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className="border border-gray-300 p-2 text-left bg-gray-100"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row: T, rowIndex: number) => (
          <tr
            key={rowIndex}
            onClick={() => handelChangeFormData && handelChangeFormData(row)}
          >
            {row &&
              columns.map((column) => {
                const value = row[column.key as keyof T] as string | number;
                return (
                  <td
                    key={String(column.key)}
                    className="border border-gray-300 p-2"
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
        ))}
      </tbody>
    </table>
  );
};
