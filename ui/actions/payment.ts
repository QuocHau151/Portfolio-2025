import http from "@/libs/http";

export const paymentApiRequest = {
  getPaymentListAdmin: () => {
    return http.get(`/payment/admin`);
  },
};
