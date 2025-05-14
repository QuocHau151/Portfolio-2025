import { apiProfileRequest } from "@/actions/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      apiProfileRequest.getProfile();
    },
  });
};
export const useGetProfileById = (id: number) => {
  return useQuery({
    queryKey: ["profile-id"],
    queryFn: () => apiProfileRequest.getProfileById(id),
  });
};
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      return apiProfileRequest.updateProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      return apiProfileRequest.updatePassword(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
