import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function saveAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const access = jwtDecode<{ exp: number }>(accessToken);
  const refresh = jwtDecode<{ exp: number }>(refreshToken);
  const now = Date.now() / 1000;
  if (
    !Number.isFinite(access.exp) ||
    !Number.isFinite(refresh.exp) ||
    access.exp <= now ||
    refresh.exp <= now
  ) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }
  const store = await cookies();
  const options = {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
  store.set("accessToken", accessToken, {
    ...options,
    expires: access.exp * 1000,
  });
  store.set("refreshToken", refreshToken, {
    ...options,
    expires: refresh.exp * 1000,
  });
}
