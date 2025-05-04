import http from "@/libs/http";
import {
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "@/schemas/auth.schema";
import {
  ClientLoginBodyType,
  ClientLoginResType,
} from "@/schemas/client.schema";

const ClientApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,
  sLogin: (body: ClientLoginBodyType) =>
    http.post<ClientLoginResType>("/client/auth/login", body),
  login: (body: ClientLoginBodyType) =>
    http.post<ClientLoginResType>("/api/client/auth/login", body, {
      baseUrl: "",
    }),
  sLogout: (
    body: LogoutBodyType & {
      accessToken: string;
    },
  ) =>
    http.post(
      "/client/auth/logout",
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      },
    ),
  logout: () => http.post("/api/client/auth/logout", null, { baseUrl: "" }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/client/auth/refresh-token", body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      "/api/client/auth/refresh-token",
      null,
      {
        baseUrl: "",
      },
    );
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null;
    return result;
  },
};

export default ClientApiRequest;
