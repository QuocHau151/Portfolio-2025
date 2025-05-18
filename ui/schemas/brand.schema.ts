import { z } from "zod";

export const BrandSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  logo: z.string().url().max(1000),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const CreateBrandSchema = z.object({
  name: z.string(),
  logo: z.string(),
});
export const UpdateBrandSchema = CreateBrandSchema;
export type CreateBrandType = z.infer<typeof CreateBrandSchema>;
export type UpdateBrandType = z.infer<typeof UpdateBrandSchema>;
export type BrandType = z.infer<typeof BrandSchema>;
