import http from "@/libs/http";
import {
  UpdatePasswordBodyType,
  UpdateProfileBodyType,
} from "@/schemas/profile.schema";

export const apiProfileRequest = {
  getProfileById: (id: number) => {
    return http.get(`/profile/${id}`);
  },
  getProfile: () => {
    return http.get("/profile");
  },
  updateProfile: (data: UpdateProfileBodyType) => {
    return http.put("/profile", data);
  },
  updatePassword: (data: UpdatePasswordBodyType) => {
    return http.put("/profile/change-password", data);
  },
};
