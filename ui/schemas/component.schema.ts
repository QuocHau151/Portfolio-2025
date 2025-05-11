import { z } from "zod";

export const ComponentSchema = z.object({
  id: z.number(),
  typeId: z.number(),
  name: z.string(),
  description: z.string(),
  content: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const TypeComponentSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const CreateComponentBodySchema = ComponentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const CreateComponentResSchema = z.object({
  message: z.string(),
});
export const UpdateComponentBodySchema = ComponentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateComponentResSchema = z.object({
  message: z.string(),
});
export const CreateTypeComponentBodySchema = TypeComponentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const CreateTypeComponentResSchema = z.object({
  message: z.string(),
});
export const UpdateTypeComponentBodySchema = TypeComponentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateTypeComponentResSchema = z.object({
  message: z.string(),
});
export const GetListComponentsRes = z.object({
  data: z.array(
    ComponentSchema.extend({
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
});
export const getListTypeComponentRes = z.object({
  data: z.array(
    z
      .object({
        id: z.number(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
      .extend({
        components: z.array(ComponentSchema),
      }),
  ),
});

export type ComponentType = z.infer<typeof ComponentSchema>;
export type TypeComponentType = z.infer<typeof TypeComponentSchema>;
export type GetListComponentsResType = z.infer<typeof GetListComponentsRes>;
export type GetListTypeComponentResType = z.infer<
  typeof getListTypeComponentRes
>;
export type CreateComponentBodyType = z.infer<typeof CreateComponentBodySchema>;
export type CreateComponentResType = z.infer<typeof CreateComponentResSchema>;
export type UpdateComponentBodyType = z.infer<typeof UpdateComponentBodySchema>;
export type UpdateComponentResType = z.infer<typeof UpdateComponentResSchema>;
