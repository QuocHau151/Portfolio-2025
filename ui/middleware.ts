import { NextRequest } from "next/server";

// // const { auth } = NextAuth(authConfig);
// export default auth(async function middleware(req: NextRequest) {
//   const { nextUrl } = req;
//   const session = await auth();
//   const userRole = session?.user?.role;
//   const isLoggedIn = !!session;
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const IsSalesRoute = salesRoutes.includes(nextUrl.pathname);
//   const IsAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
//   if (isApiAuthRoute) {
//     return NextResponse.next();
//   }

//   if (isLoggedIn) {
//     if (IsAuthRoute) {
//       return NextResponse.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin),
//       );
//     }
//     return NextResponse.next();
//   }
//   if (isAdminRoute) {
//     if (!isLoggedIn || userRole === "USER") {
//       return NextResponse.redirect(new URL("/login", nextUrl));
//     }
//   }

//   if (!isLoggedIn && IsSalesRoute) {
//     return NextResponse.redirect(new URL("/login", nextUrl));
//   }
//   return NextResponse.next();
// });

export default async function middleware(req: NextRequest) {}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
