import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "./constants/authRoute";
import { logger } from "./libs/logger";
import { decodeToken } from "./libs/utils";

export default async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  let role = null;
  let hasValidToken = false;

  // Chỉ decode token khi token tồn tại
  if (accessToken) {
    try {
      const decodedToken = decodeToken(accessToken);
      hasValidToken =
        Number.isFinite(decodedToken.exp) &&
        decodedToken.exp > Date.now() / 1000;
      if (hasValidToken) role = decodedToken.roleName;
    } catch (error) {
      // Token không hợp lệ là lỗi phía người gọi (WARN), xử lý như chưa đăng nhập.
      // Không ghi token, chỉ ghi loại lỗi.
      logger.warn(
        {
          err: {
            type: error instanceof Error ? error.name : "UnknownError",
            message: error instanceof Error ? error.message : String(error),
          },
          path: req.nextUrl.pathname,
        },
        "Invalid access token cookie",
      );
    }
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  // Nếu cố truy cập trang admin mà không phải admin
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Nếu cố truy cập trang đăng nhập/đăng ký mà đã đăng nhập
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Các trường hợp khác, cho phép tiếp tục
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
