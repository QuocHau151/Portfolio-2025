import http from "@/libs/http";
import { PermissionResType } from "@/schemas/permission.schema";

export const apiPermissionRequest = {
  getPermissions: () => {
    return http.get<PermissionResType>("/permissions");
  },
  createRolePermissions: (data: any) => {
    return http.post("/permissions/role-permissions", data);
  },
  updateRolePermissions: (data: any) => {
    return http.put("/permissions/role-permissions", data);
  },
};
