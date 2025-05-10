import { create } from "zustand";
import { StatisticsI } from "@/utils/types";

interface useStatisticsStoreI {
  statisticsTableData: StatisticsI[];
  setStatisticsTableData: (tasks: StatisticsI[]) => void;
}

export const useStatisticsStore = create<useStatisticsStoreI>((set) => ({
  statisticsTableData: [],
  setStatisticsTableData: (statisticsTableData) => set({ statisticsTableData }),
}));
