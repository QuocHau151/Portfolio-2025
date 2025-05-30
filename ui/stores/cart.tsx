import { create } from "zustand";

type CartType = {
  cart: any[];
  setCart: (cart: any[]) => void;
};

export const useCartStore = create<CartType>()((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
}));
