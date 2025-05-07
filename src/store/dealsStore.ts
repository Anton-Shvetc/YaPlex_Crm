import { create } from "zustand";
import { Deal } from "@/utils/types";

interface DealsStore {
  deals: Deal[];
  currentDeal: Deal | null;
  setDeals: (deals: Deal[]) => void;
  addDeal: (deals: Deal) => void;
  updateDeal: (id: number, deal: Partial<Deal>) => void;
  deleteDeal: (id: number) => void;
  setCurrentDeal: (deal: Deal | null) => void;
}

export const useDealsStore = create<DealsStore>((set) => ({
  deals: [],
  currentDeal: null,
  setDeals: (deals) => set({ deals }),
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  updateDeal: (id, updates) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id ? { ...deal, ...updates } : deal
      ),
    })),
  deleteDeal: (id) =>
    set((state) => ({
      deals: state.deals.filter((deal) => deal.id !== id),
    })),
  setCurrentDeal: (deal) => set({ currentDeal: deal }),
}));
