import { paymentApiRequest } from "@/actions/payment";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentListQuery = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: paymentApiRequest.getPaymentListAdmin,
  });
};
