import { blogApiRequest } from "@/actions/blog"; // Import từ file đã có
import { BlogBodyType } from "@/schemas/blog.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Cần import useQuery

export const useGetBlogsMutation = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogApiRequest.getBlogs,
  });
};
export const useGetCategoryBlogMutation = (id: number) => {
  return useQuery({
    queryKey: ["category-blog"],
    queryFn: () => blogApiRequest.getCategoryBlog(id),
  });
};
export const useGetBlogByIdMutation = (id: number) => {
  return useQuery({
    queryKey: ["blog-by-id"],
    queryFn: () => blogApiRequest.getBlogById(id),
  });
};
export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: BlogBodyType }) =>
      blogApiRequest.updateBlog(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs-by-id"],
      });
    },
  });
};
export const GetAuthorBlogMutation = (id: number) => {
  return useQuery({
    queryKey: ["author-blog", id],
    queryFn: () => blogApiRequest.getAuthorBlog(id),
  });
};
export const useGetListCategoryBlogMutation = () => {
  return useQuery({
    queryKey: ["list-category-blog"],
    queryFn: blogApiRequest.getListCategoryBlog,
  });
};
export const useDeleteBlogMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => blogApiRequest.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};
export const useDeleteCategoryBlogMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => blogApiRequest.deleteCategoryBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-category-blog"],
      });
    },
  });
};
export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BlogBodyType) => blogApiRequest.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};
export const useGetBlogsByAythorQuery = () => {
  return useQuery({
    queryKey: ["blog-by-author"],
    queryFn: () => blogApiRequest.getBlogsByAuthor(),
  });
};
