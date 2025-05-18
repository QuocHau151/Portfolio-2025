import { createZodDto } from 'nestjs-zod';
import { ProductSchema } from 'src/common/models/common-product.model';
import { SKUSchema } from 'src/common/models/common-sku.model';
import {
  CreateProductBodySchema,
  GetManageProductsQuerySchema,
  GetProductDetailResSchema,
  GetProductParamsSchema,
  GetProductsQuerySchema,
  GetProductsResSchema,
  UpdateProductBodySchema,
} from 'src/routes/product/product.model';
import { z } from 'zod';

export class ProductDTO extends createZodDto(ProductSchema) {}

export class GetProductsResDTO extends createZodDto(
  z.object({
    data: GetProductsResSchema,
  }),
) {}

export class GetProductsQueryDTO extends createZodDto(GetProductsQuerySchema) {}

export class GetManageProductsQueryDTO extends createZodDto(
  GetManageProductsQuerySchema,
) {}

export class GetProductParamsDTO extends createZodDto(GetProductParamsSchema) {}

export class GetProductDetailResDTO extends createZodDto(
  z.object({
    data: GetProductDetailResSchema.extend({
      skus: z.array(SKUSchema),
      categories: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
      brands: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  }),
) {}

export class CreateProductBodyDTO extends createZodDto(
  CreateProductBodySchema,
) {}

export class UpdateProductBodyDTO extends createZodDto(
  UpdateProductBodySchema,
) {}
