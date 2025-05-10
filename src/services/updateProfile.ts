import { enqueueSnackbar } from "notistack";
import { FetchService } from "./fetcher";
import { ProfileFormData } from "@/utils/types";

export const updateProfile = async (userData: ProfileFormData) => {
  try {
    const { success, message, status, data } = await new FetchService()
      .PUT("/api/user/profile", userData)
      .send();

    enqueueSnackbar(message, { variant: success ? "success" : "error" });

    if (success) {
      return { success, message, status, data };
    } else {
      return { success, status };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Непредвиденная ошибка" };
  }
};

// Использование:
