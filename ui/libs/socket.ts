import envConfig from "@/configs/config";
import { io } from "socket.io-client";

export const generateSocketInstace = (accessToken: string) => {
  const socket = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    auth: {
      Authorization: `Bearer ${accessToken}`,
    },
    transports: ["websocket"],
  });

  return socket;
};
