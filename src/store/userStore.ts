import { create } from "zustand";
import { UserI } from "@/utils/types";

interface UserStoreI {
  user: UserI | {};
  setUser: (user: UserI) => void;
}

export const useUserStore = create<UserStoreI>((set) => ({
  user: {},
  setUser: (user) => set({user}),
}));
