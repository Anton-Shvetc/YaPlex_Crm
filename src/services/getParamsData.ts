import { enqueueSnackbar } from "notistack";
import { FetchService } from "./fetcher";

export const getParamsData = async <T>(
  endpoint: string,
  setState: (data: T[]) => void,
  loaderMethods?: { startLoading: () => void; stopLoading: () => void }
): Promise<void> => {
  try {
    loaderMethods?.startLoading?.();
    const { success, data, message, status } = await new FetchService()
      .GET(endpoint) // Указываем тип ответа как массив T
      .send();

    if (success && Array.isArray(data)) {
      setState(data);
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
