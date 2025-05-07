import { create } from "zustand";
import { Deals } from "@/utils/types";

interface DealsStore {
  deals: Deals[];
  currentDeal: Deals | null;
  setDeals: (deals: Deals[]) => void;
  addDeal: (deals: Deals) => void;
  updateDeal: (id: number, deal: Partial<Deals>) => void;
  deleteDeal: (id: number) => void;
  setCurrentDeal: (deal: Deals | null) => void;
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
