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
  }),
) {}

export class GetRoleParamsDTO extends createZodDto(GetRoleParamsSchema) {}

export class GetRoleDetailResDTO extends createZodDto(
  z.object({
    data: GetRoleDetailResSchema,
  }),
) {}

export class CreateRoleBodyDTO extends createZodDto(CreateRoleBodySchema) {}

export class CreateRoleResDTO extends createZodDto(
  z.object({
    data: CreateRoleResSchema,
  }),
) {}

export class UpdateRoleBodyDTO extends createZodDto(UpdateRoleBodySchema) {}

export class GetRolesQueryDTO extends createZodDto(GetRolesQuerySchema) {}
