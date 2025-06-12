import { messengerApiRequest } from "@/actions/messenger";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const useGetRoomsQuery = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => messengerApiRequest.getRooms(),
  });
};

export const useGetRoomByUserIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => messengerApiRequest.getRoomByUserId(id),
  });
};
export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => messengerApiRequest.createChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });
};
