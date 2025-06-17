import http from "@/libs/http";
import {
  AuthorBlogType,
  BlogBodyType,
  BlogResType,
  CategoryBlogType,
  GetBlogsResType,
  GetCategoryBlogResType,
} from "@/schemas/blog.schema";

export const blogApiRequest = {
  getBlogs: () => {
    return http.get<GetBlogsResType>("/blogs");
  },
  getBlogById: (blogid: number) => {
    return http.get<BlogResType>(`/blogs/${blogid}`);
  },
  getCategoryBlog: (categoryid: number) => {
    return http.get<CategoryBlogType>(`/blogs/category/${categoryid}`);
  },
  getAuthorBlog: (authorid: number) => {
    return http.get<AuthorBlogType>(`/blogs/author/${authorid}`);
  },
  getListCategoryBlog: () => {
    return http.get<GetCategoryBlogResType>(`/blogs/category`);
  },
  deleteBlog: (blogid: number) => {
    return http.delete(`/blogs/${blogid}`);
  },
  createBlog: (body: BlogBodyType) => {
    return http.post(`/blogs/create`, body);
  },
  createCategoryBlog: (body: { name: string }) => {
    return http.post(`/blogs/category`, body);
  },
  updateBlog: (blogid: number, data: BlogBodyType) => {
    return http.put(`/blogs/${blogid}`, data);
  },
  deleteCategoryBlog: (categoryid: number) => {
    return http.delete(`/blogs/category/${categoryid}`);
  },
  getBlogsByAuthor: () => {
    return http.get<GetBlogsResType>(`/blogs/author`);
  },
};
