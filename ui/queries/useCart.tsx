import { apiCartRequest } from "@/actions/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: apiCartRequest.getCart,
  });
};
export const useGetCartItemByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["cart", id],
    queryFn: () => apiCartRequest.getCartItemById(id),
  });
};
export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      return apiCartRequest.addToCart(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      return apiCartRequest.updateCart({ id, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number[]) => {
      return apiCartRequest.deleteCart(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
