import { apiPermissionRequest } from "@/actions/permission";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => {
      return apiPermissionRequest.getPermissions();
    },
  });
};
export const useCreateRolePermissions = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return apiPermissionRequest.createRolePermissions(data);
    },
  });
};
export const useUpdateRolePermissions = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return apiPermissionRequest.updateRolePermissions(data);
    },
  });
};
