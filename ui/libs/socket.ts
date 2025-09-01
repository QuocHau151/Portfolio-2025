import { io } from "socket.io-client";

export const generateSocketInstace = (accessToken: string) => {
  const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return socket;
};
