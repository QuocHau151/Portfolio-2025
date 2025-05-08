import { useGetBlogsMutation } from "@/queries/useBlog";
import { BlogType } from "@/schemas/blog.schema";
import React from "react";
import PostCard from "./PostCard";

interface RelatedPostsProps {
  categoryId: number;
  currentPostId: number;
  posts?: BlogType[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  categoryId,
  currentPostId,
  posts,
}) => {
  // Fetch blogs if posts are not provided
  const getBlogsMutation = useGetBlogsMutation();
  const blogPosts = posts || getBlogsMutation.data?.payload.data || [];

  const relatedPosts = blogPosts
    .filter(
      (post) => post.categoryId === categoryId && post.id !== currentPostId,
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-8 text-2xl font-bold text-white">Bài viết liên quan</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
