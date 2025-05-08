"use client";
import {
  generateSocketInstace,
  getAccessTokenFromLocalStorage,
} from "@/libs/utils";
import { useAppStore } from "@/stores/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef } from "react";
import ListenLogoutSocket from "./listen-logout-socket";
import RefreshToken from "./refresh-token";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSocket, setRole, setAccount } = useAppStore();
  // const [socket, setSocket] = useState<Socket | undefined>()
  // const [role, setRoleState] = useState<RoleType | undefined>()
  const count = useRef(0);

  useEffect(() => {
    if (count.current === 0) {
      const accessToken = getAccessTokenFromLocalStorage();

      if (accessToken) {
        setSocket(generateSocketInstace(accessToken));
      } else {
        setRole();
        setAccount();
      }
      count.current++;
    }
  }, [setRole, setSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <RefreshToken />
      <ListenLogoutSocket />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
