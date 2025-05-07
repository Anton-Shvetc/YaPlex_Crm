// Типы для таблицы

import { ColumnDefinition } from "@/utils/types";

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
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
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
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
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
