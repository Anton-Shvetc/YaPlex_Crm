import { UserLoginI } from "@/utils/interfaces/UserI";
import { FetchService } from "./fetcher";

export const auth = async (userData: UserLoginI) => {
  return await new FetchService().POST("/api/user/login", userData).send();
};
