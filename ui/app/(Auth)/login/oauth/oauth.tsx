"use client";

import { getErrorMessage } from "@/libs/api-error";
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
  const errorMessage = searchParams.get("errorMessage");
  useEffect(() => {
    if (count.current > 0) return;
    count.current++;
    const completeLogin = async () => {
      try {
        if (errorMessage) throw new Error(errorMessage);
        if (!accessToken || !refreshToken || !getAccount)
          throw new Error("Thiếu thông tin đăng nhập Google");
        const account = JSON.parse(getAccount);
        if (
          !account ||
          typeof account.id !== "number" ||
          typeof account.role !== "string"
        )
          throw new Error("Thông tin tài khoản không hợp lệ");
        await mutateAsync({ accessToken, refreshToken });
        setRole(account.role);
        setAccount(account);
        setSocket(generateSocketInstace(accessToken));
        setAccessTokenToLocalStorage(accessToken);
        setRefreshTokenToLocalStorage(refreshToken);
        router.replace("/");
      } catch (error) {
        toast.error(getErrorMessage(error));
        router.replace("/login");
      }
    };
    void completeLogin();
  }, [
    accessToken,
    refreshToken,
    getAccount,
    errorMessage,
    setRole,
    setAccount,
    router,
    setSocket,
    mutateAsync,
  ]);
  return null;
}
