import { z } from 'zod';

export const componentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  typeId: z.number(),
  authorId: z.number(),
  content: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const componentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const componentTypeCreateBodySchema = componentTypeSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();
export const componentCreateBodySchema = componentSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();
export const componentUpdateBodySchema = componentSchema
  .omit({
    id: true,
    authorId: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();
export const componentTypeUpdateBodySchema = componentTypeSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();
export const componentTypeResSchema = z.object({
  message: z.string(),
});

export const componentResSchema = componentSchema.extend({
  type: z.object({
    name: z.string(),
  }),
});
export type ComponentType = z.infer<typeof componentSchema>;
export type ComponentTypeType = z.infer<typeof componentTypeSchema>;
export type ComponentTypeCreateBodyType = z.infer<
  typeof componentCreateBodySchema
>;
export type ComponentTypeUpdateBodyType = z.infer<
  typeof componentUpdateBodySchema
>;
export type ComponentCreateBodyType = z.infer<typeof componentCreateBodySchema>;
export type ComponentUpdateBodyType = z.infer<typeof componentUpdateBodySchema>;
export type ComponentTypeResType = z.infer<typeof componentTypeResSchema>;
export type ComponentResType = z.infer<typeof componentResSchema>;
