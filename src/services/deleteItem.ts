import { enqueueSnackbar } from "notistack";
import { FetchService } from "./fetcher";

interface DeleteIteItem {
  id: number;
  endpoint: string;
  onSuccess?: () => void;
  loaderMethods?: {
    startLoading: () => void;
    stopLoading: () => void;
  };
  successMessage?: string;
  errorMessage?: string;
}

export const deleteItem = async ({
  id,
  endpoint,
  onSuccess,
  loaderMethods,
  successMessage = "Запись успешно деактивирована",
  errorMessage = "Ошибка при деактивации записи",
}: DeleteIteItem): Promise<boolean> => {
  try {
    loaderMethods?.startLoading?.();
    
    const { success } = await new FetchService()
      .DELETE(`${endpoint}/${id}`)
      .send();

    if (success) {
      enqueueSnackbar(successMessage, { variant: "success" });
      onSuccess?.();
      return true;
    } else {
      enqueueSnackbar(errorMessage, { variant: "error" });
      return false;
    }
  } catch (error) {
    console.error(error);
    enqueueSnackbar(errorMessage, { variant: "error" });
    return false;
  } finally {
    loaderMethods?.stopLoading?.();
  }
};