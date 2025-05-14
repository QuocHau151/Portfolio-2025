import { UserStatus } from "@/constants/type";
import { z } from "zod";
import { RoleSchema } from "./role.schema";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email({
    message: "Phải thuộc dạng email",
  }),
  name: z.string().min(1).max(100),
  password: z.string().min(6).max(100),
  phone: z.string().min(9).max(15),
  address: z.string().nullable(),
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
export const UpdateUserBodySchema = UserSchema.pick({
  email: true,
  name: true,
  phone: true,
  address: true,
  avatar: true,
  status: true,
  roleId: true,
}).strict();
export const GetUserByIdResSchema = z.object({
  data: UserSchema.extend({
    role: RoleSchema.pick({
      id: true,
      name: true,
    }).extend({
      permissions: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          module: z.string(),
          path: z.string(),
          method: z.string(),
        }),
      ),
    }),
  }),
});
export type GetUsersResType = z.TypeOf<typeof GetUsersResSchema>;
export type UpdateUserBodyType = z.TypeOf<typeof UpdateUserBodySchema>;
export type GetUserByIdResType = z.TypeOf<typeof GetUserByIdResSchema>;
