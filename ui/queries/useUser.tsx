import { apiUserRequest } from "@/actions/user";
import { UpdateUserBodyType } from "@/schemas/user.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiUserRequest.getUsers(),
  });
};
export const useGetUserByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiUserRequest.getUserById(id),
  });
};
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => apiUserRequest.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
export const useUpdateUserMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserBodyType }) =>
      apiUserRequest.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiUserRequest.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
