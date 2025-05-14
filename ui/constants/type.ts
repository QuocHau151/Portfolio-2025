import { RoleType } from "@/types/jwt.types";

export const TokenType = {
  ForgotPasswordToken: "ForgotPasswordToken",
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
  TableToken: "TableToken",
} as const;

export const Role = {
  Admin: "ADMIN",
  Client: "CLIENT",
  Guest: "GUEST",
} as const;

export const RoleValues = [Role.Admin, Role.Client, Role.Guest] as const;

export const OrderStatus = {
  Pending: "Pending",
  Processing: "Processing",
  Rejected: "Rejected",
  Delivered: "Delivered",
  Paid: "Paid",
} as const;

export const OrderStatusValues = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Rejected,
  OrderStatus.Delivered,
  OrderStatus.Paid,
] as const;

export const ManagerRoom = "manager" as const;

export const REQUEST_USER_KEY = "user";
export const REQUEST_ROLE_PERMISSIONS = "role_permissions";
export const AuthType = {
  Bearer: "Bearer",
  None: "None",
  APIKey: "ApiKey",
} as const;

export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType];

export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export const TypeOfVerificationCode = {
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  LOGIN: "LOGIN",
  DISABLE_2FA: "DISABLE_2FA",
} as const;

export type TypeOfVerificationCodeType =
  (typeof TypeOfVerificationCode)[keyof typeof TypeOfVerificationCode];
export type ForgotPasswordType = {
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type AccountType = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  role: RoleType;
};
export type UserAdminType = {
  id: string;
  email: string;
  phone: string;
  status: "pending" | "processing" | "success" | "failed";
};

export type ContactAdminType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  note: string;
  status: "pending" | "processing" | "success" | "failed";
};
export const BlogTag = {
  NOI_BAT: "NOI_BAT",
  NORMAL: "NORMAL",
} as const;

export const HTTPMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
} as const;
