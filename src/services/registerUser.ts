import { FetchService } from "./fetcher";
import { RegisterFormDataType } from "@/utils/types";

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
  };
}

export const registerUser = async (userData: RegisterFormDataType) : Promise<AuthResponse> => {
  return await new FetchService().POST("/api/user/register", userData).send();
};
