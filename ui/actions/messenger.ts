import http from "@/libs/http";

export const messengerApiRequest = {
  getRooms: () => {
    return http.get("/chat");
  },
  getRoomById: (id: number) => {
    return http.get(`/chat/${id}`);
  },
  getRoomByUserId: (id: string) => {
    return http.get(`/chat/user/${id}`);
  },
  createChat: (data: any) => {
    return http.post("/chat", data);
  },
};
