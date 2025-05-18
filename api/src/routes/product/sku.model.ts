import { SKUSchema } from 'src/common/models/common-sku.model';
import { z } from 'zod';

export const UpsertSKUBodySchema = SKUSchema.pick({
  value: true,
  price: true,
  stock: true,
  images: true,
});

export type UpsertSKUBodyType = z.infer<typeof UpsertSKUBodySchema>;
