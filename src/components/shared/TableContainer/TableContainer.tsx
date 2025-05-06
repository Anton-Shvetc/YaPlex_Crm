// Определяем общий тип для данных таблицы
type TableData<T = unknown> = T;

// Тип для пропсов компонента
interface TableContainerProps<T> {
  tableData: TableData<T>;
}

// Компонент с типизацией
export const TableContainer = <T,>({ tableData }: TableContainerProps<T>) => {
  return <>{Array.isArray(tableData) && tableData?.map(el => <div key={el?.id}>{el?.name}</div>)}</>;
};