import { DateTime } from "luxon";

export const formatDate = (
  dateString?: string,
  format: string = "dd MMM yyyy"
): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const formattedDate = DateTime.fromJSDate(date)
    .setLocale("ru")
    .toFormat(format);
  return formattedDate;
};

// export const formatDate = (dateString: string): string => {
//   if (!dateString) return "";

//   if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
//     const [year, month, day] = dateString.split("-");
//     return `${day}.${month}.${year}`;
//   }

//   return dateString;
// };

// export const formatValueForDisplay = (key: string, value: unknown): string => {
//   if (key === "dueDate" || key === "deadline") {
//     return formatDate(String(value));
//   }
//   return String(value);
// };
