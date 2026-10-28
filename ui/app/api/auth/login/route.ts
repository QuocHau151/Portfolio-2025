import authApiRequest from "@/actions/auth";
import { LoginBodyType } from "@/schemas/auth.schema";
import { saveAuthCookies } from "@/libs/auth-cookies";
import { HttpError } from "@/libs/http";
import { logger } from "@/libs/logger";

export async function POST(request: Request) {
  let body: LoginBodyType;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Body JSON không hợp lệ" },
      { status: 400 },
    );
  }
  try {
    const { payload } = await authApiRequest.sLogin(body);
    const { accessToken, refreshToken } = payload.data;
    await saveAuthCookies(accessToken, refreshToken);
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      // Chỉ ghi loại lỗi để tránh đưa token hoặc thông tin đăng nhập vào log.
      const cause = error instanceof Error ? error.cause : undefined;
      logger.error(
        {
          err: {
            type: error instanceof Error ? error.name : "UnknownError",
            message: error instanceof Error ? error.message : String(error),
            code:
              cause && typeof cause === "object" && "code" in cause
                ? cause.code
                : undefined,
          },
        },
        "Login backend request failed",
      );
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
