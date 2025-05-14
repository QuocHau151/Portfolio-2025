import { apiRoleRequest } from "@/actions/role";
import { CreateRoleBodyType, UpdateRoleBodyType } from "@/schemas/role.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => {
      return apiRoleRequest.getRoles();
    },
  });
};
export const useGetRoleById = (id: number) => {
  return useQuery({
    queryKey: ["role-id", id],
    queryFn: () => {
      return apiRoleRequest.getRoleById(id);
    },
  });
};
export const useCreateRole = () => {
  return useMutation({
    mutationFn: (data: CreateRoleBodyType) => {
      return apiRoleRequest.createRole(data);
    },
  });
};
export const useUpdateRole = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleBodyType }) => {
      return apiRoleRequest.updateRole(id, data);
    },
  });
};
export const useDeleteRole = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return apiRoleRequest.deleteRole(id);
    },
  });
};
