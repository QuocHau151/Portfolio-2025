import { createZodDto } from 'nestjs-zod';
import {
  GetRolesResSchema,
  GetRoleParamsSchema,
  GetRoleDetailResSchema,
  CreateRoleBodySchema,
  CreateRoleResSchema,
  UpdateRoleBodySchema,
  GetRolesQuerySchema,
} from './role.model';
import { z } from 'zod';
export class GetRolesResDTO extends createZodDto(
  z.object({
    data: GetRolesResSchema,
    statusCode: z.number(),
  }),
) {}

export class GetRoleParamsDTO extends createZodDto(GetRoleParamsSchema) {}

export class GetRoleDetailResDTO extends createZodDto(
  z.object({
    data: GetRoleDetailResSchema,
    statusCode: z.number(),
  }),
) {}

export class CreateRoleBodyDTO extends createZodDto(CreateRoleBodySchema) {}

export class CreateRoleResDTO extends createZodDto(
  z.object({
    data: CreateRoleResSchema,
    statusCode: z.number(),
  }),
) {}

export class UpdateRoleBodyDTO extends createZodDto(UpdateRoleBodySchema) {}

export class GetRolesQueryDTO extends createZodDto(GetRolesQuerySchema) {}
