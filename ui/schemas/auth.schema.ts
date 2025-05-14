import { Role, UserStatus } from "@/constants/type";
import z from "zod";
import { RoleSchema } from "./role.schema";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email({
    message: "Phải thuộc dạng email",
  }),
  name: z.string().min(1).max(100),
  password: z.string().min(6).max(100),
  phone: z.string().min(9).max(15),
  address: z.string().min(1).max(255).nullable(),
  avatar: z.string().nullable(),
  totpSecret: z.string().nullable(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
  roleId: z.number().positive(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});


export const LoginBody = z
  .object({
    email: z.string().min(1, { message: "required" }).email({
      message: "invalidEmail",
    }),
    password: z.string().min(6, "minmaxPassword").max(100, "minmaxPassword"),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      address: z.string(),
      email: z.string(),
      phone: z.string(),
      role: z.enum([Role.Admin, Role.Client]),
      avatar: z.string(),
    }),
  }),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>;

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  message: z.string(),
});

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>;

export const LogoutBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>;

export const LoginGoogleQuery = z.object({
  code: z.string(),
});

export type LoginGoogleQueryType = z.TypeOf<typeof LoginGoogleQuery>;

export const RegisterBody = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phone: true,
})
  .extend({
    confirmPassword: z.string().min(6).max(100),
    code: z.string().min(6),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password and confirm password must match",
        path: ["confirmPassword"],
      });
    }
  });

export const RegisterRes = UserSchema.omit({
  password: true,
  totpSecret: true,
});
export const RegisterBodyStepBefore = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phone: true,
})
  .extend({
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password and confirm password must match",
        path: ["confirmPassword"],
      });
    }
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmNewPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
export type RegisterResType = z.TypeOf<typeof RegisterRes>;
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
export type RegisterBodyStepBeforeType = z.TypeOf<
  typeof RegisterBodyStepBefore
>;;

export type UserType = z.infer<typeof UserSchema>;
