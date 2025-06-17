import React from "react";

import {
  GetAuthorBlogMutation,
  useGetCategoryBlogMutation,
} from "@/queries/useBlog";
import { BlogType } from "@/schemas/blog.schema";
import { Clock, User } from "lucide-react";
import Link from "next/link";

interface FeaturedPostProps {
  post: BlogType;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const getCategory = useGetCategoryBlogMutation(post.categoryId);
  const getAuthor = GetAuthorBlogMutation(post.authorId);
  const category = getCategory.data?.payload.data.name;
  const author = getAuthor.data?.payload.data.name;

  return (
    <div className="group relative mb-12 h-[400px] w-full overflow-hidden rounded-xl md:h-[500px]">
      {/* Background Image with Overlay */}
      <Link href={`/blog/${post.id}`} className="absolute inset-0 bg-black">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </Link>

      {/* Content */}
      <div className="absolute right-0 bottom-0 left-0 flex flex-col p-6 md:p-8">
        <div className="mb-4">
          <span className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-black">
            {category}
          </span>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h2 className="group-hover:text-primary mb-3 text-2xl font-bold text-white transition-colors duration-300 md:text-4xl">
            {post.title}
          </h2>
        </Link>

        <p className="mb-4 max-w-3xl text-neutral-300">{post.description}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="border-primary flex h-10 w-10 items-center justify-center rounded-full border-2 object-cover">
              <User />
            </div>

            <div className="ml-3">
              <p className="font-medium text-white">{author}</p>
              <p className="text-sm text-neutral-400">
                {(() => {
                  try {
                    const date = new Date(post.createdAt);
                    return date.toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  } catch (error) {
                    return "Không có ngày";
                  }
                })()}
              </p>
            </div>
          </div>

          <div className="flex items-center text-neutral-400">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">5 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
