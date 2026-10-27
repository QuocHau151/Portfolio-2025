import { saveAuthCookies } from "@/libs/auth-cookies";

export async function POST(request: Request) {
  let body: { accessToken: string; refreshToken: string };
  try {
    body = await request.json();
    if (
      !body ||
      typeof body.accessToken !== "string" ||
      typeof body.refreshToken !== "string"
    ) {
      throw new Error("Missing tokens");
    }
    await saveAuthCookies(body.accessToken, body.refreshToken);
  } catch {
    return Response.json(
      { message: "Token đăng nhập không hợp lệ" },
      { status: 400 },
    );
  }
  return Response.json({
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
  });
}
