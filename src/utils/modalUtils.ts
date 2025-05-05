export const getModalTitle = (
  modalType: string,
  entityType: string
): string => {
  if (modalType === "new") {
    switch (entityType) {
      case "client":
        return "Новый клиент";
      case "deal":
        return "Новая сделка";
      case "task":
        return "Новая задача";
    }
  } else if (modalType === "edit") {
    switch (entityType) {
      case "client":
        return "Карточка клиента";
      case "deal":
        return "Карточка сделки";
      case "task":
        return "Карточка задачи";
    }
  } else {
    switch (entityType) {
      case "client":
        return "Просмотр клиента";
      case "deal":
        return "Просмотр сделки";
      case "task":
        return "Просмотр задачи";
    }
  }
  return "";
};
