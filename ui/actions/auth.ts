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
  sLogin: (body: LoginBodyType) =>
    http.post<LoginResType>("/auth/login", body, {
      baseUrl: process.env.API_ENDPOINT,
    }),
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    });
  },
  sRegister: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body, {
      baseUrl: process.env.API_ENDPOINT,
    }),
  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>("/api/auth/register", body, {
      baseUrl: "",
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
        baseUrl: process.env.API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      },
    ),
  logout: () =>
    http.post("/api/auth/logout", null, {
      baseUrl: "",
    }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/auth/refresh-token", body, {
      baseUrl: process.env.API_ENDPOINT,
    }),
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
    try {
      return await this.refreshTokenRequest;
    } finally {
      this.refreshTokenRequest = null;
    }
  },
  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) =>
    http.post("/api/auth/token", body, {
      baseUrl: "",
    }),
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
  getGoogleLoginUrl: () => {
    return http.get("/auth/google-link");
  },
};

export default authApiRequest;
