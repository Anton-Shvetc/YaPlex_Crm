import { enqueueSnackbar } from "notistack";
import { FetchService } from "./fetcher";

interface DeleteIteItem {
  id?: number | string ;
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

    const { success, status } = await new FetchService()
      .DELETE(id ? `${endpoint}/${id}` : endpoint)
      .send();

    if (success) {
      enqueueSnackbar(successMessage, { variant: "success" });
      onSuccess?.();
      return true;
    } else {
      enqueueSnackbar(errorMessage, { variant: "error" });

      if (status === 401 || status === 403) {
        return true;
      }

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
