import { enqueueSnackbar } from "notistack";
import { FetchService } from "./fetcher";

export const getParamsData = async <T,>(
    requestLink: string,
    setState: (data: T[]) => void
  ): Promise<void> => {
    if (!requestLink) return;
    try {
      const { success, data } = await new FetchService()
        .GET(requestLink) // Указываем тип ответа как массив T
        .send();
  
      if (success && Array.isArray(data)) {
        console.log("table data", data);
        setState(data);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Ошибка при получении данных", { variant: "error" });
    }
  };