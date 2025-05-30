import http from "@/libs/http";

export const apiCartRequest = {
  getCart: () => {
    return http.get("/cart");
  },
  getCartItemById: (id: number) => {
    return http.get(`/cart/${id}`);
  },
  addToCart: async (data: any) => {
    return await http.post("/cart", data);
  },
  updateCart: async ({ id, data }: { id: number; data: any }) => {
    return await http.put(`/cart/${id}`, data);
  },
  deleteCart: async (cartItemIds: number[]) => {
    return await http.post(`/cart/delete`, { cartItemIds });
  },
};
