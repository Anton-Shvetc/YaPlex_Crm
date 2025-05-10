import { LoginFormDataType, UserI } from "@/utils/types";
import { FetchService } from "./fetcher";

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    userData?: UserI
    // другие данные, если они есть
  };
}
export const login = async (
  userData: LoginFormDataType
): Promise<AuthResponse> => {
  return await new FetchService().POST("/api/user/login", userData).send();
};

export const logout = async () => {
  return await new FetchService().GET("/api/user/logout").send();
};
