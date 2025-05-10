import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  activeLoaders: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: true,
  activeLoaders: 0,

  startLoading: () =>
    set((state) => {
      const newActiveLoaders = state.activeLoaders + 1;
      return {
        activeLoaders: newActiveLoaders,
        isLoading: newActiveLoaders > 0,
      };
    }),

  stopLoading: () =>
    set((state) => {
      const newActiveLoaders = Math.max(0, state.activeLoaders - 1);
      return {
        activeLoaders: newActiveLoaders,
        isLoading: newActiveLoaders > 0,
      };
    }),
}));
