import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "./constants/authRoute";
import { decodeToken } from "./libs/utils";

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  let role = null;

  // Chỉ decode token khi token tồn tại
  if (accessToken) {
    try {
      const decodedToken = decodeToken(accessToken);
      role = decodedToken?.roleName;
    } catch (error) {
      // Token không hợp lệ, xử lý như chưa đăng nhập
      console.error("Invalid token:", error);
    }
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  // Nếu cố truy cập trang admin mà không phải admin
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Nếu cố truy cập trang đăng nhập/đăng ký mà đã đăng nhập
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Các trường hợp khác, cho phép tiếp tục
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
