import http from "@/libs/http";
import {
  CreateRoleBodyType,
  RoleByIdResType,
  RoleResType,
  UpdateRoleBodyType,
} from "@/schemas/role.schema";

export const apiRoleRequest = {
  getRoles: () => {
    return http.get<RoleResType>("/roles");
  },
  getRoleById: (id: number) => {
    return http.get<RoleByIdResType>(`/roles/${id}`);
  },
  createRole: (data: CreateRoleBodyType) => {
    return http.post("/roles", data);
  },
  updateRole: (id: number, data: UpdateRoleBodyType) => {
    return http.put(`/roles/${id}`, data);
  },
  deleteRole: (id: number) => {
    return http.delete(`/roles/${id}`);
  },
};
