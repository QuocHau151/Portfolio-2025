import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const CreateCategorySchema = z.object({
  name: z.string(),
});
export const UpdateCategorySchema = CreateCategorySchema;
export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
export type CategoryType = z.infer<typeof CategorySchema>;
