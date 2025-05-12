import { ColumnDefinition, EntityTableRowMap, EntityType } from "@/utils/types";
import { TableContainer } from "../TableContainer/TableContainer";

interface ReportTableContainerProps<T> {
  reportTitle: string;
  tableData: T[];
  columns: ColumnDefinition<T>[];
}
export const ReportTableContainer = <T extends object>({
  reportTitle = "",
  tableData = [],
  columns = [],
}: ReportTableContainerProps<T>) => {
  return (
    <div>
      <h3 className="flex justify-center">{reportTitle}</h3>

      <TableContainer<T>
        tableData={tableData}
        columns={columns}
        pagination={true}
      />
    </div>
  );
};
