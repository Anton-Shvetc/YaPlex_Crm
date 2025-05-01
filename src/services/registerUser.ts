import { FetchService } from "./fetcher";
import { RegisterFormDataType } from "@/utils/types/types";

export const registerUser = async (userData: RegisterFormDataType) => {
  return await new FetchService().POST("/api/user/register", userData).send();
};
