import authApiRequest from "@/actions/auth";
import { LoginBodyType, RegisterBodyType } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/libs/http";

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterBodyType;
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
