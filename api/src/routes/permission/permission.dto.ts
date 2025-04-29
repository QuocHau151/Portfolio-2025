import { createZodDto } from 'nestjs-zod';
import {
  CreatePermissionBodySchema,
  GetPermissionDetailResSchema,
  GetPermissionParamsSchema,
  GetPermissionsQuerySchema,
  GetPermissionsResSchema,
  UpdatePermissionBodySchema,
} from 'src/routes/permission/permission.model';
import { z } from 'zod';

export class GetPermissionsResDTO extends createZodDto(
  z.object({
    data: GetPermissionsResSchema,
    statusCode: z.number(),
  }),
) {}

export class GetPermissionParamsDTO extends createZodDto(
  GetPermissionParamsSchema,
) {}

export class GetPermissionDetailResDTO extends createZodDto(
  z.object({
    data: GetPermissionDetailResSchema,
    statusCode: z.number(),
  }),
) {}

export class CreatePermissionBodyDTO extends createZodDto(
  CreatePermissionBodySchema,
) {}

export class UpdatePermissionBodyDTO extends createZodDto(
  UpdatePermissionBodySchema,
) {}

export class GetPermissionsQueryDTO extends createZodDto(
  GetPermissionsQuerySchema,
) {}
