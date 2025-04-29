import React from "react";

import PostCard from "./PostCard";
import { blogPosts } from "@/data/blogData";

interface RelatedPostsProps {
  category: string;
  currentPostId: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  category,
  currentPostId,
}) => {
  const relatedPosts = blogPosts
    .filter((post) => post.category === category && post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-8 text-2xl font-bold text-white">Related Articles</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
