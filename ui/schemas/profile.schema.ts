import { UserStatus } from "@/constants/type";
import { z } from "zod";
import { PermissionSchema } from "./permission.schema";
import { RoleSchema } from "./role.schema";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
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
export const UserProfileResSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
}).extend({
  role: RoleSchema.pick({
    id: true,
    name: true,
  }).extend({
    permissions: z.array(
      PermissionSchema.pick({
        id: true,
        name: true,
        module: true,
        path: true,
        method: true,
      }),
    ),
  }),
});
export const UpdateProfileBodySchema = UserSchema.pick({
  name: true,
  phone: true,
  address: true,
  avatar: true,
});
export const UpdatePasswordBodySchema = z
  .object({
    password: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    confirmNewPassword: z.string().min(6).max(100),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const UpdatePasswordResSchema = z.object({
  data: z.object({
    message: z.string(),
  }),
});
export const UpdateProfileResSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
});
export const GetUserProfileResSchema = z.object({
  data: UserProfileResSchema,
});
export type UserType = z.infer<typeof UserSchema>;
export type GetUserProfileResType = z.infer<typeof GetUserProfileResSchema>;
export type UpdateProfileResType = z.infer<typeof UpdateProfileResSchema>;
export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBodySchema>;
export type UpdatePasswordBodyType = z.infer<typeof UpdatePasswordBodySchema>;
export type UpdatePasswordResType = z.infer<typeof UpdatePasswordResSchema>;
