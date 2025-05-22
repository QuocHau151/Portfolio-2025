import { PermissionSchema } from 'src/common/models/common-permission';
import { z } from 'zod';

export const GetPermissionsResSchema = z.object({
  permissions: z.array(PermissionSchema),
});

export const GetPermissionsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1), // Phải thêm coerce để chuyển từ string sang number
    limit: z.coerce.number().int().positive().default(100), // Phải thêm coerce để chuyển từ string sang number
  })
  .strict();

export const GetPermissionParamsSchema = z
  .object({
    permissionId: z.coerce.number(), // Phải thêm coerce để chuyển từ string sang number
  })
  .strict();

export const GetPermissionDetailResSchema = PermissionSchema;

export const CreatePermissionBodySchema = PermissionSchema.pick({
  name: true,
  path: true,
  method: true,
  module: true,
}).strict();

export const UpdatePermissionBodySchema = CreatePermissionBodySchema;

export type PermissionType = z.infer<typeof PermissionSchema>;
export type GetPermissionsResType = z.infer<typeof GetPermissionsResSchema>;
export type GetPermissionDetailResType = z.infer<
  typeof GetPermissionDetailResSchema
>;
export type CreatePermissionBodyType = z.infer<
  typeof CreatePermissionBodySchema
>;
export type GetPermissionParamsType = z.infer<typeof GetPermissionParamsSchema>;
export type UpdatePermissionBodyType = z.infer<
  typeof UpdatePermissionBodySchema
>;
