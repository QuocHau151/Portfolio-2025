import { orderApiRequest } from "@/actions/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const useGetOrderListQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderApiRequest.getOrderListAdmin,
  });
};
export const useGetOrderByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderApiRequest.getOrderById(id),
  });
};
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => orderApiRequest.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => orderApiRequest.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
export const useConfirmOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => orderApiRequest.confirmOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
