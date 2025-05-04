import { createZodDto } from 'nestjs-zod';
import {
  DisableTwoFactorBodySchema,
  ForgotPasswordBodySchema,
  GetAuthorizationUrlResSchema,
  LoginBodySchema,
  LoginResSchema,
  LogoutBodySchema,
  RefreshTokenBodySchema,
  RefreshTokenResSchema,
  RegisterBodySchema,
  RegisterResSchema,
  SendOPTBodySchema,
  SendOTPResSchema,
  TwoFactorSetupResSchema,
} from 'src/routes/auth/auth.model';
import { z } from 'zod';

// Các DTO RESPONSE trả về phải là { data: any, statusCode: number }
// Còn Các Request DTO thì không cần phải có trả về 1 object như vậy
export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResDTO extends createZodDto(
  z.object({
    data: RegisterResSchema,
  }),
) {}

export class SendOPTBodyDTO extends createZodDto(SendOPTBodySchema) {}

export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}

export class LoginResDTO extends createZodDto(
  z.object({
    data: LoginResSchema,
  }),
) {}
export class RefreshTokenResDTO extends createZodDto(
  z.object({
    data: RefreshTokenResSchema,
  }),
) {}
export class SendOTPResDTO extends createZodDto(
  z.object({
    data: SendOTPResSchema,
  }),
) {}
export class RefreshTokenBodyDTO extends createZodDto(RefreshTokenBodySchema) {}
export class LogoutBodyDTO extends createZodDto(LogoutBodySchema) {}
export class GetAuthorizationUrlResDTO extends createZodDto(
  GetAuthorizationUrlResSchema,
) {}

export class ForgotPasswordBodyDTO extends createZodDto(
  ForgotPasswordBodySchema,
) {}
export class TwoFactorSetupResDTO extends createZodDto(
  z.object({
    data: TwoFactorSetupResSchema,
  }),
) {}
export class DisableTwoFactorBodyDTO extends createZodDto(
  DisableTwoFactorBodySchema,
) {}
