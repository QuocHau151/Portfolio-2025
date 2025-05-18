import { apiProductRequest } from "@/actions/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: apiProductRequest.getProducts,
  });
};
export const useGetProductIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["product-id"],
    queryFn: () => apiProductRequest.getProductID(id),
  });
};
export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => apiProductRequest.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiProductRequest.updateProduct({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiProductRequest.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
