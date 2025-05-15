import { ColumnDefinition} from "@/utils/types";
import { TableContainer } from "../TableContainer/TableContainer";

interface ReportTableContainerProps<T> {
  reportTitle: string;
  tableData: T[];
  columns: ColumnDefinition<T>[];
  noDataText?: string;
}
export const ReportTableContainer = <T extends object>({
  reportTitle = "",
  tableData = [],
  columns = [],
  noDataText = "Нет данных",
}: ReportTableContainerProps<T>) => {
  return (
    <div className="pt-2">
      <h3 className="flex  text-lg dark:text-[#fff]">{reportTitle}</h3>

      <TableContainer<T>
        tableData={tableData}
        columns={columns}
        pagination={true}
        noDataText={noDataText}
      />
    </div>
  );
};
