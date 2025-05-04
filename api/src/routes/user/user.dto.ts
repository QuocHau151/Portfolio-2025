import { createZodDto } from 'nestjs-zod';
import { UpdateProfileResDTO } from 'src/common/dtos/common-user.dto';
import {
  CreateUserBodySchema,
  GetUserParamsSchema,
  GetUsersQuerySchema,
  GetUsersResSchema,
  UpdateUserBodySchema,
} from 'src/routes/user/user.model';
import { z } from 'zod';

export class GetUsersResDTO extends createZodDto(
  z.object({
    data: GetUsersResSchema,
  }),
) {}

export class GetUsersQueryDTO extends createZodDto(GetUsersQuerySchema) {}

export class GetUserParamsDTO extends createZodDto(GetUserParamsSchema) {}

export class CreateUserBodyDTO extends createZodDto(CreateUserBodySchema) {}

export class UpdateUserBodyDTO extends createZodDto(UpdateUserBodySchema) {}

export class CreateUserResDTO extends UpdateProfileResDTO {}
