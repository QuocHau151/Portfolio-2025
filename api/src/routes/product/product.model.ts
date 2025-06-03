import { OrderBy, SortBy } from 'src/common/constants/other.constant';
import {
  ProductSchema,
  VariantsType,
} from 'src/common/models/common-product.model';
import { SKUSchema } from 'src/common/models/common-sku.model';
import { UpsertSKUBodySchema } from 'src/routes/product/sku.model';

import { z } from 'zod';

function generateSKUs(variants: VariantsType) {
  // Hàm hỗ trợ để tạo tất cả tổ hợp
  function getCombinations(arrays: string[][]): string[] {
    return arrays.reduce(
      (acc, curr) =>
        acc.flatMap((x) => curr.map((y) => `${x}${x ? '-' : ''}${y}`)),
      [''],
    );
  }

  // Lấy mảng các options từ variants
  const options = variants.map((variant) => variant.options);

  // Tạo tất cả tổ hợp
  const combinations = getCombinations(options);

  // Chuyển tổ hợp thành SKU objects
  return combinations.map((value) => ({
    value,
    price: 0,
    stock: 100,
    image: [],
  }));
}

/**
 * Dành cho client và guest
 */
export const GetProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  name: z.string().optional(),
  brands: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return [Number(value)];
      }
      return value;
    }, z.array(z.coerce.number().int().positive()))
    .optional(),
  categories: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return [Number(value)];
      }
      return value;
    }, z.array(z.coerce.number().int().positive()))
    .optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  createdById: z.coerce.number().int().positive().optional(),
  orderBy: z.enum([OrderBy.Asc, OrderBy.Desc]).default(OrderBy.Desc),
  sortBy: z
    .enum([SortBy.CreatedAt, SortBy.Price, SortBy.Sale])
    .default(SortBy.CreatedAt),
});

/**
 * Dành cho Admin và Seller
 */
export const GetManageProductsQuerySchema = GetProductsQuerySchema.extend({
  isPublic: z.preprocess((value) => value === 'true', z.boolean()).optional(),
  createdById: z.coerce.number().int().positive(),
});

export const GetProductsResSchema = z.object({
  data: z.array(
    ProductSchema.extend({
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
  ),
  totalItems: z.number(),
  page: z.number(), // Số trang hiện tại
  limit: z.number(), // Số item trên 1 trang
  totalPages: z.number(), // Tổng số trang
});

export const GetProductParamsSchema = z
  .object({
    productId: z.coerce.number().int().positive(),
  })
  .strict();

export const GetProductDetailResSchema = ProductSchema.extend({
  skus: z.array(SKUSchema),
});

export const CreateProductBodySchema = ProductSchema.pick({
  publishedAt: true,
  name: true,
  basePrice: true,
  virtualPrice: true,
  brands: true,
  images: true,
  variants: true,
})
  .extend({
    categories: z.array(z.coerce.number().int().positive()),
    skus: z.array(UpsertSKUBodySchema),
  })
  .strict()
  .superRefine(({ variants, skus }, ctx) => {
    // Kiểm tra xem số lượng SKU có hợp lệ hay không
    const skuValueArray = generateSKUs(variants);
    if (skus.length !== skuValueArray.length) {
      return ctx.addIssue({
        code: 'custom',
        path: ['skus'],
        message: `Số lượng SKU nên là ${skuValueArray.length}. Vui lòng kiểm tra lại.`,
      });
    }

    // Kiểm tra từng SKU có hợp lệ hay không
    let wrongSKUIndex = -1;
    const isValidSKUs = skus.every((sku, index) => {
      const isValid = sku.value === skuValueArray[index].value;
      if (!isValid) {
        wrongSKUIndex = index;
      }
      return isValid;
    });

    if (!isValidSKUs) {
      ctx.addIssue({
        code: 'custom',
        path: ['skus'],
        message: `Giá trị SKU index ${wrongSKUIndex} không hợp lệ. Vui lòng kiểm tra lại.`,
      });
    }
  });

export const UpdateProductBodySchema = ProductSchema.pick({
  publishedAt: true,
  name: true,
  basePrice: true,
  virtualPrice: true,
  brands: true,
  images: true,
  variants: true,
})
  .extend({
    categories: z.array(z.coerce.number().int().positive()),
    skus: z.array(UpsertSKUBodySchema),
  })
  .strict()
  .superRefine(({ variants, skus }, ctx) => {
    // Kiểm tra xem số lượng SKU có hợp lệ hay không
    const skuValueArray = generateSKUs(variants);
    if (skus.length !== skuValueArray.length) {
      return ctx.addIssue({
        code: 'custom',
        path: ['skus'],
        message: `Số lượng SKU nên là ${skuValueArray.length}. Vui lòng kiểm tra lại.`,
      });
    }
  });

export type GetProductsResType = z.infer<typeof GetProductsResSchema>;
export type GetProductsQueryType = z.infer<typeof GetProductsQuerySchema>;
export type GetManageProductsQueryType = z.infer<
  typeof GetManageProductsQuerySchema
>;
export type GetProductDetailResType = z.infer<typeof GetProductDetailResSchema>;
export type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
export type GetProductParamsType = z.infer<typeof GetProductParamsSchema>;
export type UpdateProductBodyType = z.infer<typeof UpdateProductBodySchema>;
