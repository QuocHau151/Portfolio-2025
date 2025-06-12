import http from "@/libs/http";

export const messengerApiRequest = {
  getRooms: () => {
    return http.get("/chat");
  },
  getRoomByUserId: (id: string) => {
    return http.get(`/chat/user/${id}`);
  },
  createChat: (data: any) => {
    return http.post("/chat", data);
  },
};
