export const getStatusColor = (status?: string) => {
  let btnColor = "text-gray-800";

  // Обработка isActive

  switch (status) {
    case "Завершена":
      btnColor = "text-emerald-150";
      break;
    case "Отменена":
      btnColor = "text-amber-150";
      break;
    case "В работе":
      btnColor = "text-[#3f53d9]";
      break;
  }

  return btnColor;
};
