import { create } from "zustand";

type OrderType = {
  order: any[];
  setOrder: (order: any[]) => void;
};

export const useOrderStore = create<OrderType>()((set) => ({
  order: [],
  setOrder: (order) => set({ order }),
}));
