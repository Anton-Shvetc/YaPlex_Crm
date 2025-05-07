// Типы для таблицы
type ColumnDefinition<T> = {
  key: string; // Ключ из объекта данных
  label: string; // Заголовок колонки
  render?: (value: any, row: T) => React.ReactNode; // Опциональный кастомный рендерер
};

interface TableContainerProps<T> {
  tableData: T[]; // Массив данных
  columns: ColumnDefinition<T>[]; // Конфигурация колонок
}

// Компонент с типизацией
export const TableContainer = <T extends Record<string, any>>({
  tableData,
  columns,
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
          <tr key={rowIndex}>
            {columns.map((column) => {
              const value = row[column.key];
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
