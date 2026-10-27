import authApiRequest from "@/actions/auth";
import { LoginBodyType } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { HttpError } from "@/libs/http";

export async function POST(request: Request) {
  let body: LoginBodyType;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Body JSON không hợp lệ" }, { status: 400 });
  }
  try {
    const { payload } = await authApiRequest.sLogin(body);
    const { accessToken, refreshToken } = payload.data;
    const decodedAccessToken = jwtDecode<{ exp: number }>(accessToken);
    const decodedRefreshToken = jwtDecode<{ exp: number }>(refreshToken);
    if (
      !Number.isFinite(decodedAccessToken.exp) ||
      !Number.isFinite(decodedRefreshToken.exp)
    ) {
      throw new Error("Backend trả về token không có thời hạn hợp lệ");
    }
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: decodedRefreshToken.exp * 1000,
    });
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      // Chỉ ghi loại lỗi để tránh đưa token hoặc thông tin đăng nhập vào log.
      const cause = error instanceof Error ? error.cause : undefined;
      console.error("Login backend request failed", {
        name: error instanceof Error ? error.name : "UnknownError",
        code:
          cause && typeof cause === "object" && "code" in cause
            ? cause.code
            : undefined,
      });
      return Response.json(
        {
          message: "Không thể xử lý đăng nhập, vui lòng thử lại sau",
        },
        {
          status: 500,
        },
      );
    }
  }
}
