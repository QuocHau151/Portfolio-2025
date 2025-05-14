"use client";

import { generateSocketInstace } from "@/libs/socket";
import {
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/libs/utils";
import { useSetTokenToCookieMutation } from "@/queries/useAuth";
import { useAppStore } from "@/stores/app";
import { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Google Login Redirect",
  description: "Google Login Redirect",
  robots: {
    index: false,
  },
};

export default function Oauth() {
  const { mutateAsync } = useSetTokenToCookieMutation();
  const router = useRouter();
  const count = useRef(0);
  const setSocket = useAppStore((state) => state.setSocket);
  const setRole = useAppStore((state) => state.setRole);
  const setAccount = useAppStore((state) => state.setAccount);
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const getAccount = searchParams.get("account");
  const account = getAccount ? JSON.parse(getAccount) : null;
  useEffect(() => {
    if (accessToken && refreshToken) {
      if (count.current === 0) {
        mutateAsync({ accessToken, refreshToken })
          .then(() => {
            setRole(account.role);
            setAccount(account);
            setSocket(generateSocketInstace(accessToken));
            setAccessTokenToLocalStorage(accessToken);
            setRefreshTokenToLocalStorage(refreshToken);
            router.push("/");
          })
          .catch(() => {
            toast("Có lỗi xảy ra");
          });
        count.current++;
      }
    } else {
      if (count.current === 0) {
        setTimeout(() => {
          toast("Có lỗi xảy ra");
        });
        count.current++;
      }
    }
  }, [accessToken, refreshToken, setRole, router, setSocket, mutateAsync]);
  return null;
}
