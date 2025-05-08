import { Role, TokenType } from "@/constants/type";

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType];
export type RoleType = (typeof Role)[keyof typeof Role];
export interface TokenPayload {
  deviceId: string;
  roleName: string;
  userId: number;
  role: RoleType;
  exp: number;
  iat: number;
  uuid: string;
}

export interface TableTokenPayload {
  iat: number;
  number: number;
  tokenType: (typeof TokenType)["TableToken"];
}
