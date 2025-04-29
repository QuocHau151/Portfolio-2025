import { TypeOfVerificationCode } from 'src/common/constants/auth.constant';
import { UserSchema } from 'src/common/models/common-user.model';
import { z } from 'zod';

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phoneNumber: true,
})
  .extend({
    confirmPassword: z.string().min(6).max(100),
    code: z.string().length(6),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['confirmPassword'],
      });
    }
  });

export const RegisterResSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
});

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
})
  .extend({
    totpCode: z.string().length(6).optional(),
    code: z.string().length(6).optional(),
  })
  .strict();

export const LoginResSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export const DeviceSchema = z.object({
  id: z.number(),
  userId: z.number(),
  userAgent: z.string(),
  ip: z.string(),
  lastActive: z.date(),
  createdAt: z.date(),
  isActive: z.boolean(),
});

export const RefreshTokenSchema = z.object({
  token: z.string(),
  userId: z.number(),
  deviceId: z.number(),
  expiresAt: z.date(),
  createdAt: z.date(),
});

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const VerificationCode = z.object({
  id: z.number(),
  code: z.string(),
  email: z.string().email(),
  type: z.enum([
    TypeOfVerificationCode.REGISTER,
    TypeOfVerificationCode.FORGOT_PASSWORD,
    TypeOfVerificationCode.LOGIN,
    TypeOfVerificationCode.DISABLE_2FA,
  ]),
  expiresAt: z.date(),
  createdAt: z.date(),
});

export const SendOPTBodySchema = VerificationCode.pick({
  email: true,
  type: true,
}).strict();

export const LogoutBodySchema = z.object({
  refreshToken: z.string(),
});
export const RefreshTokenBodySchema = z
  .object({
    refreshToken: z.string(),
  })
  .strict();
export const RefreshTokenResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export const GoogleAuthStateSchema = DeviceSchema.pick({
  userAgent: true,
  ip: true,
});
export const GetAuthorizationUrlResSchema = z.object({
  url: z.string().url(),
});
export const ForgotPasswordBodySchema = z
  .object({
    email: z.string().email(),
    code: z.string().length(6),
    newPassword: z.string().min(6).max(100),
    confirmNewPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu và mật khẩu xác nhận phải giống nhau',
        path: ['confirmNewPassword'],
      });
    }
  });

export const DisableTwoFactorBodySchema = z
  .object({
    code: z.string().length(6).optional(),
    totpCode: z.string().length(6).optional(),
  })
  .superRefine(({ code, totpCode }, ctx) => {
    if ((totpCode !== undefined) === (code !== undefined)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Code or totpCode is required',
        path: ['totpCode'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Code or totpCode is required',
        path: ['code'],
      });
    }
  });
export const TwoFactorSetupResSchema = z.object({
  secret: z.string(),
  uri: z.string(),
});
export type SendOPTBodyType = z.infer<typeof SendOPTBodySchema>;
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
export type DeviceType = z.infer<typeof DeviceSchema>;
export type RoleType = z.infer<typeof RoleSchema>;
export type VerificationCodeType = z.infer<typeof VerificationCode>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type GoogleAuthStateType = z.infer<typeof GoogleAuthStateSchema>;
export type GetAuthorizationUrlResType = z.infer<
  typeof GetAuthorizationUrlResSchema
>;
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBodySchema>;
export type DisableTwoFactorBodyType = z.infer<
  typeof DisableTwoFactorBodySchema
>;
export type TwoFactorSetupResType = z.infer<typeof TwoFactorSetupResSchema>;
