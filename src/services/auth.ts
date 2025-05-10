import { UserLoginI } from "@/utils/types";
import { FetchService } from "./fetcher";
import { useClientStore } from "@/store/clientStore";
import { useStatisticsStore } from "@/store/statisticsStore";
import { useTasksStore } from "@/store/tasksStore";
import { useDealsStore } from "@/store/dealsStore";

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    // другие данные, если они есть
  };
}
export const login = async (userData: UserLoginI): Promise<AuthResponse> => {
  return await new FetchService().POST("/api/user/login", userData).send();
};

export const logout = async () => {
  const { setClients } = useClientStore();
  const { setDeals } = useDealsStore();
  const { setTasks } = useTasksStore();
  const { setStatisticsTableData } = useStatisticsStore();

  // Вынести в отдельный обработчик
  setClients([]);
  setDeals([]);
  setTasks([]);
  setStatisticsTableData([]);

  return await new FetchService().GET("/api/user/logout").send();
};
