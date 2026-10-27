import authApiRequest from "@/actions/auth";
import { HttpError } from "@/libs/http";
import { RegisterBodyType } from "@/schemas/auth.schema";

export async function POST(request: Request) {
  let body: RegisterBodyType;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Body JSON không hợp lệ" },
      { status: 400 },
    );
  }
  try {
    const { payload } = await authApiRequest.sRegister(body);
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Có lỗi xảy ra",
        },
        {
          status: 500,
        },
      );
    }
  }
}
