import { BlogTag } from "@/constants/type";
import { z } from "zod";

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

export const GetBlogsRes = z.object({
  data: z.array(BlogSchema),
});
export const getCategoryBlogRes = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      createdById: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
});
export const CategoryBlogSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});
export const GetListCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const AuthorBlogSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});
export const BlogBodySchema = BlogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
const CategoryBlogResSchema = z.object({
  data: CategoryBlogSchema,
});
export const BlogResSchema = z.object({
  data: BlogSchema,
});
export type BlogType = z.infer<typeof BlogSchema>;
export type CategoryBlogResType = z.infer<typeof CategoryBlogResSchema>;
export type GetBlogsResType = z.infer<typeof GetBlogsRes>;
export type GetCategoryBlogResType = z.infer<typeof getCategoryBlogRes>;
export type CategoryBlogType = z.infer<typeof CategoryBlogSchema>;
export type AuthorBlogType = z.infer<typeof AuthorBlogSchema>;
export type BlogBodyType = z.infer<typeof BlogBodySchema>;
export type BlogResType = z.infer<typeof BlogResSchema>;
export type GetListCategoryType = z.infer<typeof GetListCategorySchema>;
