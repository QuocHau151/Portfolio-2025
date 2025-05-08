import { BlogTag } from 'src/common/constants/blog.constant';
import { z } from 'zod';

export const BlogSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  authorId: z.number(),
  title: z.string(),
  description: z.string(),
  tag: z.enum([BlogTag.NOI_BAT, BlogTag.NORMAL]),
  keyword: z.string().array(),
  content: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateBlogBodySchema = BlogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();
export const CreateBlogResSchema = z.object({
  message: z.string(),
});

export const CreateCategoryBlogBodySchema = z.object({
  name: z.string(),
});

export const UpdateBlogSchema = BlogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export const UpdateBlogCategoryBodySchema = z.object({
  name: z.string(),
});

export type Blog = z.infer<typeof BlogSchema>;
export type CreateBlogBodyType = z.infer<typeof CreateBlogBodySchema>;
export type CreateCategoryBodyBlogType = z.infer<
  typeof CreateCategoryBlogBodySchema
>;
export type UpdateBlogType = z.infer<typeof UpdateBlogSchema>;
export type UpdateBlogCategoryBodyType = z.infer<
  typeof UpdateBlogCategoryBodySchema
>;
