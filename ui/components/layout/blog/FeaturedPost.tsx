"use client";

import {
  GetAuthorBlogMutation,
  useGetCategoryBlogMutation,
} from "@/queries/useBlog";
import { BlogType } from "@/schemas/blog.schema";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeaturedPostProps {
  post: BlogType;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const getCategory = useGetCategoryBlogMutation(post.categoryId);
  const getAuthor = GetAuthorBlogMutation(post.authorId);
  const category = getCategory.data?.payload.data.name;
  const author = getAuthor.data?.payload.data.name;

  return (
    <div className="group relative mb-12 h-[400px] w-full overflow-hidden rounded-2xl border border-white/5 md:h-[500px]">
      {/* Background Image */}
      <Link href={`/blog/${post.id}`} className="absolute inset-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover object-center transition-all duration-700 group-hover:scale-105"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        {/* Glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(800px circle at 50% 100%, rgba(40,236,141,0.1), transparent 60%)",
          }}
        />
      </Link>

      {/* Content */}
      <div className="absolute right-0 bottom-0 left-0 flex flex-col p-6 md:p-8">
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
            {category}
          </span>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h2 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-primary md:text-4xl">
            {post.title}
          </h2>
        </Link>

        <p className="mb-4 max-w-3xl text-sm text-muted-foreground md:text-base">
          {post.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <User size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{author}</p>
              <p className="text-xs text-muted-foreground">
                {(() => {
                  try {
                    const date = new Date(post.createdAt);
                    return date.toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  } catch {
                    return "Không có ngày";
                  }
                })()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={14} />
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
