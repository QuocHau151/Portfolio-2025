import envConfig from "@/configs/config";
import { io } from "socket.io-client";

export const generateSocketInstace = (accessToken: string) => {
  const socket = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return socket;
};
