import http from "@/libs/http";
import { GetUserByIdResType, UpdateUserBodyType } from "@/schemas/user.schema";

export const apiUserRequest = {
  getUsers: () => {
    return http.get("/users");
  },
  getUserById: (id: number) => {
    return http.get<GetUserByIdResType>(`/users/${id}`);
  },
  createUser: (data: any) => {
    return http.post("/users", data);
  },
  updateUser: (id: number, data: UpdateUserBodyType) => {
    return http.put(`/users/${id}`, data);
  },
  deleteUser: (id: number) => {
    return http.delete(`/users/${id}`);
  },
};
