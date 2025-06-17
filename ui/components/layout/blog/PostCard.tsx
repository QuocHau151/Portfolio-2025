"use client";
import {
  GetAuthorBlogMutation,
  useGetCategoryBlogMutation,
} from "@/queries/useBlog";
import { BlogType } from "@/schemas/blog.schema";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: BlogType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const getCategory = useGetCategoryBlogMutation(post.categoryId);
  const getAuthor = GetAuthorBlogMutation(post.authorId);
  const category = getCategory.data?.payload.data.name;
  const author = getAuthor.data?.payload.data.name;
  console.log(post);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 transition-transform duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-black">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-5">
        <div className="mb-2 flex gap-1">
          {post.keyword?.map((keyword) => (
            <span
              key={keyword}
              className="bg-primary rounded-full px-2 py-0.5 text-[10px] font-medium text-black"
            >
              {keyword}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.id}`}>
          <h3 className="group-hover:text-primary mb-2 text-xl font-bold text-white transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 flex-grow text-neutral-400">
          {post.description}
        </p>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-black">
              {author
                ?.split(" ")
                .slice(0, 2) // lấy 2 từ đầu tiên
                .map((word) => word[0]) // lấy chữ cái đầu
                .join("")
                .toUpperCase()}
            </div>
            <span className="ml-2 text-neutral-300">{author}</span>
          </div>

          <div className="flex items-center text-neutral-500">
            <Clock size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
