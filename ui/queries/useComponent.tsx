import { apiComponentRequst } from "@/actions/component";
import {
  CreateComponentBodyType,
  UpdateComponentBodyType,
} from "@/schemas/component.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useComponentQuery = () => {
  return useQuery({
    queryKey: ["components"],
    queryFn: apiComponentRequst.getComponents,
  });
};
export const useComponentByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["components", id],
    queryFn: () => apiComponentRequst.getComponentById(id),
  });
};
export const useCreateComponentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateComponentBodyType) =>
      apiComponentRequst.createComponent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["components"],
      });
    },
  });
};
export const useDeleteComponentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiComponentRequst.deleteComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["components"],
      });
    },
  });
};
export const useUpdateComponentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateComponentBodyType }) =>
      apiComponentRequst.updateComponent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["components"],
      });
    },
  });
};
export const useGetTypeComponentQuery = () => {
  return useQuery({
    queryKey: ["type-component"],
    queryFn: apiComponentRequst.getTypeComponent,
  });
};
export const useDeleteTypeComponentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiComponentRequst.deleteTypeComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["type-component"],
      });
    },
  });
};
export const useGetComponentByAuthorQuery = () => {
  return useQuery({
    queryKey: ["components", "author"],
    queryFn: apiComponentRequst.getComponentByAuthor,
  });
};
