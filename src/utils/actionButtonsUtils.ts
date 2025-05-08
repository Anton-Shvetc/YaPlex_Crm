// import { ButtonStatePropsI } from "./types";

// export const getPrimaryActionText = (modalType: string): string => {
//   if (modalType === "new") {
//     return "Создать";
//   } else if (modalType === "edit") {
//     return "Редактировать";
//   } else {
//     return "ОК";
//   }
// };

// export const getSecondaryActionText = (
//   modalType: string,
//   entityType: string,
//   onClick?: () => void
// ): ButtonStatePropsI => {
//   console.log("modalType:", modalType, "entityType:", entityType);

//   if (modalType === "edit") {
//     switch (entityType) {
//       case "clients":
//         return {
//           text: "Удалить клиента",
//           variant: "delete",
//           onClick: () => {

//             /*TODO - Добавить функцию перевода в is_active - false*/
//           },
//         };
//       case "deals":
//         return {
//           text: "Завершить сделку",
//           variant: "finished", // Было опечатка "fineshed"
//           onClick: () => {
//             /*TODO - Добавить функцию перевода в status - завершено*/
//           },
//         };
//       case "tasks":
//         return {
//           text: "Завершить задачу", // Не хватало запятой после этого свойства
//           variant: "finished", // Было опечатка "fineshed"
//           onClick: () => {
//             /*TODO - Добавить функцию перевода в status - завершено*/
//           },
//         };
//     }
//   }
//   return { text: "Отменить", onClick:  onClick };
// };

export const getSecondaryActionClass = (
  modalType: string,
  entityType: string
): string => {
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
