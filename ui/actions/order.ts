import http from "@/libs/http";

export const orderApiRequest = {
  getOrderListAdmin: () => {
    return http.get(`/orders/admin`);
  },
  getOrderList: () => {
    return http.get(`/orders`);
  },
  getOrderById: (id: number) => {
    return http.get(`/orders/${id}`);
  },
  createOrder: (data: any) => {
    return http.post(`/orders`, data);
  },
  cancelOrder: (id: number) => {
    return http.put(`/orders/${id}`, {});
  },
  confirmOrder: (id: number) => {
    return http.post(`/orders/confirm/${id}`, {});
  },
};
