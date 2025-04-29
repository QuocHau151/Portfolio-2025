import React from "react";

import { Clock } from "lucide-react";
import { BlogPost } from "@/types/blogTypes";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className="group relative mb-12 h-[400px] w-full overflow-hidden rounded-xl md:h-[500px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute right-0 bottom-0 left-0 flex flex-col p-6 md:p-8">
        <div className="mb-4">
          <span className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-black">
            {post.category}
          </span>
        </div>

        <h2 className="group-hover:text-primary mb-3 text-2xl font-bold text-white transition-colors duration-300 md:text-4xl">
          {post.title}
        </h2>

        <p className="mb-4 max-w-3xl text-neutral-300">{post.excerpt}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="border-primary h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="ml-3">
              <p className="font-medium text-white">{post.author.name}</p>
              <p className="text-sm text-neutral-400">{post.publishedDate}</p>
            </div>
          </div>

          <div className="flex items-center text-neutral-400">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
