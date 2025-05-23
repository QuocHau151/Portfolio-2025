import { UserSchema } from 'src/common/models/common-user.model';
import { z } from 'zod';
import { RoleSchema } from '../auth/auth.model';

export const GetUsersResSchema = z.object({
  result: z.array(
    UserSchema.omit({ password: true, totpSecret: true }).extend({
      role: RoleSchema.pick({
        id: true,
        name: true,
      }),
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetUsersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
  })
  .strict();

export const GetUserParamsSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .strict();

export const CreateUserBodySchema = UserSchema.pick({
  email: true,
  name: true,
  phone: true,
  address: true,
  avatar: true,
  status: true,
  password: true,
  roleId: true,
}).strict();

export const UpdateUserBodySchema = UserSchema.pick({
  email: true,
  name: true,
  phone: true,
  address: true,
  avatar: true,
  status: true,
  roleId: true,
}).strict();

export type GetUsersResType = z.infer<typeof GetUsersResSchema>;
export type GetUsersQueryType = z.infer<typeof GetUsersQuerySchema>;
export type GetUserParamsType = z.infer<typeof GetUserParamsSchema>;
export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>;
export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>;
