import { createZodDto } from 'nestjs-zod';
import {
  CreateBrandBodySchema,
  GetBrandDetailResSchema,
  GetBrandParamsSchema,
  GetBrandsResSchema,
  UpdateBrandBodySchema,
} from 'src/routes/brand/brand.model';
import { z } from 'zod';

export class GetBrandsResDTO extends createZodDto(
  z.object({
    data: GetBrandsResSchema,
  }),
) {}

export class GetBrandParamsDTO extends createZodDto(GetBrandParamsSchema) {}

export class GetBrandDetailResDTO extends createZodDto(
  z.object({
    data: GetBrandDetailResSchema,
  }),
) {}

export class CreateBrandBodyDTO extends createZodDto(CreateBrandBodySchema) {}

export class UpdateBrandBodyDTO extends createZodDto(UpdateBrandBodySchema) {}
