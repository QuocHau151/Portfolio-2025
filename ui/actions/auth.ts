import envConfig from "@/configs/config";
import {
  ForgotPasswordType,
  TypeOfVerificationCodeType,
} from "@/constants/type";
import http from "@/libs/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemas/auth.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: envConfig.NEXT_PUBLIC_URL,
    });
  },
  sRegister: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>("/api/auth/register", body, {
      baseUrl: envConfig.NEXT_PUBLIC_URL,
    });
  },
  sLogout: (
    body: LogoutBodyType & {
      accessToken: string;
    },
  ) =>
    http.post(
      "/auth/logout",
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      },
    ),
  logout: () =>
    http.post("/api/auth/logout", null, { baseUrl: envConfig.NEXT_PUBLIC_URL }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/auth/refresh-token", body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      "/api/auth/refresh-token",
      null,
      {
        baseUrl: "",
      },
    );
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null;
    return result;
  },
  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) =>
    http.post("/api/auth/token", body, { baseUrl: envConfig.NEXT_PUBLIC_URL }),
  checkEmailExits: (body: { email: string }) => {
    return http.post("/auth/checkemailexits", body);
  },
  sendOTP: (body: { email: string; type: string }) => {
    return http.post("/auth/otp", body);
  },
  verificationCode: (body: {
    email: string;
    code: string;
    type: TypeOfVerificationCodeType;
  }) => {
    return http.post("/auth/verificationcode", body);
  },
  forgotPassword: (body: ForgotPasswordType) => {
    return http.post("/auth/forgot-password", body);
  },
};

export default authApiRequest;
