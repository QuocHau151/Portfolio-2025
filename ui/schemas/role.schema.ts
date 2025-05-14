import { z } from "zod";
import { PermissionSchema } from "./permission.schema";

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  description: z.string(),
  isActive: z.boolean().default(true),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const RoleResSchema = z.object({
  data: z.object({
    roles: z.array(RoleSchema),
    totalItems: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});
export const RoleByIdResSchema = z.object({
  data: RoleSchema.extend({
    permissions: z.array(PermissionSchema),
  }),
});
export const UpdateRoleBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  isActive: z.boolean().default(true),
  permissionIds: z.array(z.number()),
});
export const CreateRoleBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  isActive: z.boolean().default(true),
});
export type CreateRoleBodyType = z.infer<typeof CreateRoleBodySchema>;
export type UpdateRoleBodyType = z.infer<typeof UpdateRoleBodySchema>;
export type RoleResType = z.infer<typeof RoleResSchema>;
export type RoleByIdResType = z.infer<typeof RoleByIdResSchema>;
export type RoleType = z.infer<typeof RoleSchema>;
export const RolePermissionsSchema = RoleSchema.extend({
  permissions: z.array(PermissionSchema),
});
export type RolePermissionsType = z.infer<typeof RolePermissionsSchema>;
