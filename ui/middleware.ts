import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "./constants/authRoute";
import { decodeToken } from "./libs/utils";

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const decodedToken = decodeToken(accessToken as string);
  const role = decodedToken?.roleName;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const IsAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
  if (IsAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
