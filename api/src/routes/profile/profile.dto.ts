import { createZodDto } from 'nestjs-zod';
import {
  ChangePasswordBodySchema,
  GetProfileResSchema,
  UpdateProfileBodySchema,
  UpdateUserProfileResSchema,
} from './profile.model';
import { z } from 'zod';

export class GetProfileResDTO extends createZodDto(
  z.object({
    data: GetProfileResSchema,
    statusCode: z.number(),
  }),
) {}
export class UpdateProfileBodyDTO extends createZodDto(
  UpdateProfileBodySchema,
) {}
export class UpdateUserProfileResDTO extends createZodDto(
  z.object({
    data: UpdateUserProfileResSchema,
    statusCode: z.number(),
  }),
) {}
export class ChangePasswordBodyDTO extends createZodDto(
  ChangePasswordBodySchema,
) {}
