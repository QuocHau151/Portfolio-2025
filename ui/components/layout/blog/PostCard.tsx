import React from "react";

import { Clock } from "lucide-react";
import { BlogPost } from "@/types/blogTypes";

interface PostCardProps {
  post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 transition-transform duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-black">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-5">
        <h3 className="group-hover:text-primary mb-2 text-xl font-bold text-white transition-colors duration-300">
          {post.title}
        </h3>

        <p className="mb-4 flex-grow text-neutral-400">
          {post.excerpt.length > 100
            ? `${post.excerpt.substring(0, 100)}...`
            : post.excerpt}
        </p>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="border-primary h-8 w-8 rounded-full border object-cover"
            />
            <span className="ml-2 text-neutral-300">{post.author.name}</span>
          </div>

          <div className="flex items-center text-neutral-500">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
