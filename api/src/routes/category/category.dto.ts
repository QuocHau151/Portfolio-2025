import { createZodDto } from 'nestjs-zod';
import {
  CreateCategoryBodySchema,
  GetAllCategoriesQuerySchema,
  GetAllCategoriesResSchema,
  GetCategoryDetailResSchema,
  GetCategoryParamsSchema,
  UpdateCategoryBodySchema,
} from 'src/routes/category/category.model';
import { z } from 'zod';

export class GetAllCategoriesResDTO extends createZodDto(
  z.object({
    data: GetAllCategoriesResSchema,
  }),
) {}

export class GetAllCategoriesQueryDTO extends createZodDto(
  GetAllCategoriesQuerySchema,
) {}

export class GetCategoryParamsDTO extends createZodDto(
  GetCategoryParamsSchema,
) {}

export class GetCategoryDetailResDTO extends createZodDto(
  z.object({
    data: GetCategoryDetailResSchema,
  }),
) {}

export class CreateCategoryBodyDTO extends createZodDto(
  CreateCategoryBodySchema,
) {}

export class UpdateCategoryBodyDTO extends createZodDto(
  UpdateCategoryBodySchema,
) {}
