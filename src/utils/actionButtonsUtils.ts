export const getPrimaryActionText = (modalType: string): string => {
    if (modalType === "new") {
      return "Создать";
    } else if (modalType === "edit") {
      return "Редактировать";
    } else {
      return "ОК";
    }
  };

  export const getSecondaryActionText = (modalType: string, entityType: string): string => {
    if (modalType === "edit") {
      switch (entityType) {
        case "client":
          return "Удалить клиента";
        case "deal":
          return "Завершить сделку";
        case "task":
          return "Завершить задачу";
      }
    }
    return "Отменить";
  };

  export const getSecondaryActionClass = (modalType: string, entityType: string): string => {
    if (modalType === "edit") {
      switch (entityType) {
        case "client":
          return "bg-red-500 hover:bg-red-600 text-white border-none";
        case "deal":
          return "bg-green-500 hover:bg-green-600 text-white border-none";
        case "task":
          return "bg-green-500 hover:bg-green-600 text-white border-none";
      }
    }
    return "";
  };