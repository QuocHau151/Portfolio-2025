import authApiRequest from "@/actions/auth";
import { cookies } from "next/headers";
import { saveAuthCookies } from "@/libs/auth-cookies";
import { HttpError } from "@/libs/http";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    cookieStore.delete("accessToken");
    return Response.json(
      {
        message: "Không tìm thấy refreshToken",
      },
      {
        status: 401,
      },
    );
  }
  try {
    const { payload } = await authApiRequest.sRefreshToken({
      refreshToken,
    });

    await saveAuthCookies(payload.data.accessToken, payload.data.refreshToken);
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 401) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
      }
      return Response.json(error.payload, { status: error.status });
    }
    return Response.json(
      { message: "Không thể làm mới phiên đăng nhập" },
      { status: 502 },
    );
  }
}
