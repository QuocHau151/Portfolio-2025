"use client";

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/libs/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RefreshToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const redirectPathname = searchParams.get("redirect");
  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        force: true,
        onError: () => router.replace("/login"),
        onSuccess: () => {
          const target =
            redirectPathname?.startsWith("/") &&
            !redirectPathname.startsWith("//") &&
            !redirectPathname.includes("\\")
              ? redirectPathname
              : "/";
          router.replace(target);
        },
      });
    } else {
      router.replace("/login");
    }
  }, [router, refreshTokenFromUrl, redirectPathname]);
  return <div>Refresh token....</div>;
}
