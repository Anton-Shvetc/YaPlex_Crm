import { enqueueSnackbar } from "notistack";
import { FetchService } from "./fetcher";

export const getSingleData = async <T>(
  endpoint: string,
  setState: (data: T) => void,
  loaderMethods?: { startLoading: () => void; stopLoading: () => void },
): Promise<void> => {
  try {
    loaderMethods?.startLoading?.();
    const { success, data, message } = await new FetchService()
      .GET(endpoint) // Указываем тип ответа как массив T
      .send();

    if (success) {
      setState(data as T);
      return;
    }

    enqueueSnackbar(message, { variant: success ? "success" : "error" });
  } catch (error) {
    console.error(error);
    enqueueSnackbar("Ошибка при получении данных", { variant: "error" });
  } finally {
    loaderMethods?.stopLoading?.();
  }
};
