import { apiCategoriesRequest } from "@/actions/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: apiCategoriesRequest.getCategories,
  });
};
export const useGetCategorByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["category-id"],
    queryFn: () => apiCategoriesRequest.getCategoriesID(id),
  });
};
export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return apiCategoriesRequest.createCategories(data);
    },
  });
};
export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      return apiCategoriesRequest.updateCategories({ id, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return apiCategoriesRequest.deleteCategories(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
