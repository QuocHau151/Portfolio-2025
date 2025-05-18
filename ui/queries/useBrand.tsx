import { apiBrandRequest } from "@/actions/brand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBrandsQuery = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: apiBrandRequest.getBrands,
  });
};
export const useGetBrandByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["brands-id"],
    queryFn: () => apiBrandRequest.getBrandID(id),
  });
};
export const useCreateBrandMutation = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return apiBrandRequest.createBrand(data);
    },
  });
};
export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      return apiBrandRequest.updateBrand({ id, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
};
export const useDeleteBrandMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return apiBrandRequest.deleteBrand(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
};
