export const getTableRowClasses = (status?: string | undefined | {}) => {
  let rowClasses =
    "rounded-lg border cursor-pointer shadow-md shadow-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors cursor-pointer dark:shadow-none";

  // Обработка isActive
  if (status === "isNotActive") {
    rowClasses =
      "rounded-lg bg-rose-50 text-gray-300 hover:bg-rose-100 transition-colors cursor-pointer";
    return rowClasses;
  }

  // Обработка статусов
  switch (status) {
    case "Завершена":
      rowClasses =
        "rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer";
      break;
    case "Отменена":
      rowClasses =
        "rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer";
      break;
    case "Новая":
      rowClasses =
        "rounded-lg bg-[#EFF6FF]  hover:bg-red-100 transition-colors cursor-pointer";
      break;
  }

  return rowClasses;
};
