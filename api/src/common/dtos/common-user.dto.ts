import { createZodDto } from 'nestjs-zod';
import {
  GetUserProfileResSchema,
  UpdateProfileResSchema,
} from '../models/common-user.model';
import { z } from 'zod';

/**
 * Áp dụng cho Response của api GET('profile') và GET('users/:userId')
 */
export class GetUserProfileResDTO extends createZodDto(
  z.object({
    data: GetUserProfileResSchema,
    statusCode: z.number(),
  }),
) {}

/**
 * Áp dụng cho Response của api PUT('profile') và PUT('users/:userId')
 */
export class UpdateProfileResDTO extends createZodDto(
  z.object({
    data: UpdateProfileResSchema,
    statusCode: z.number(),
  }),
) {}
