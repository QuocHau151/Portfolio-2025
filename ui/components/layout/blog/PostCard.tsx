"use client";

import {
  GetAuthorBlogMutation,
  useGetCategoryBlogMutation,
} from "@/queries/useBlog";
import { BlogType } from "@/schemas/blog.schema";
import { Clock, FileImage } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: BlogType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const getCategory = useGetCategoryBlogMutation(post.categoryId);
  const getAuthor = GetAuthorBlogMutation(post.authorId);
  const category = getCategory.data?.payload.data.name;
  const author = getAuthor.data?.payload.data.name;

  return (
    <div className="group bg-surface-elevated flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl">
      {/* Image or Placeholder */}
      <Link
        href={`/blog/${post.id}`}
        className="relative block aspect-[16/10] w-full overflow-hidden"
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02]">
            <FileImage className="text-muted-foreground/30" size={40} />
          </div>
        )}
        <div className="from-surface-elevated/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="text-primary inline-flex items-center rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
        {/* Glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at 50% 100%, rgba(40,236,141,0.08), transparent 60%)",
          }}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-grow flex-col p-5">
        {/* Keywords */}
        {post.keyword && post.keyword.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {post.keyword.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.id}`}>
          <h3 className="group-hover:text-primary mb-2 text-lg font-bold text-white transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow text-sm">
          {post.description}
        </p>

        <div className="text-muted-foreground mt-auto flex items-center justify-between border-t border-white/5 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold">
              {author
                ?.split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")
                .toUpperCase() || "?"}
            </div>
            <span className="text-white/70">{author || "Ẩn danh"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
