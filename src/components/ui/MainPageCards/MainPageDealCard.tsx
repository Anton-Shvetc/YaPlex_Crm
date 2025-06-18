import { formatDate } from "@/utils/formatters";
interface MainPageDealCardI {
  name: string;
  clientName?: string;
  status?: string;
  amount?: number;
  created_at?: string;
}

export const MainPageDealCard: React.FC<MainPageDealCardI> = ({
  name,
  clientName,
  status,
  amount,
  created_at,
}) => {
  let rowClasses =
    "rounded-lg cursor-pointer shadow-md/10 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors cursor-pointer dark:shadow-none";

  // Обработка статусов
  switch (status) {
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
    <div
      className={`w-fill flex justify-between dark:bg-amber-100 ${rowClasses}`}
    >
      <div className="p-2 flex-4 first:rounded-l-lg last:rounded-r-lg">
        {name}
      </div>
      <div className="p-2 flex-2 first:rounded-l-lg last:rounded-r-lg">
        {clientName}
      </div>
      <div className="p-2 flex-1 first:rounded-l-lg last:rounded-r-lg font-bold">
        {amount + " руб"}
      </div>
      <div className="p-2 flex-1 first:rounded-l-lg last:rounded-r-lg">
        {status}
      </div>
      <div className="p-2 flex-1 first:rounded-l-lg last:rounded-r-lg">
        {formatDate(created_at, "d MMMM yyyy")}
      </div>
    </div>
  );
};
