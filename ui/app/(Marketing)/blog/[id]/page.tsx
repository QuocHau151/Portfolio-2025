"use client";
import Newsletter from "@/components/layout/blog/Newsletter";
import RelatedPosts from "@/components/layout/blog/RelatedPosts";
import {
  GetAuthorBlogMutation,
  useGetBlogByIdMutation,
  useGetCategoryBlogMutation,
} from "@/queries/useBlog";
import { Bookmark, Clock, MessageSquare, Share2 } from "lucide-react";
import Image from "next/image";
import { use } from "react";

export default function BlogDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const getBlog = useGetBlogByIdMutation(id);
  const post = getBlog.data?.payload.data;
  const getCategory = useGetCategoryBlogMutation(post?.categoryId || 0);
  const category = getCategory.data?.payload.data.name;
  const getAuthor = GetAuthorBlogMutation(post?.authorId || 0);
  const author = getAuthor.data?.payload.data.name;
  return (
    <div className="pt-10 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative mb-12 h-[60vh] overflow-hidden rounded-xl">
          <Image
            fill
            src={post?.image || "/"}
            alt={""}
            className="h-full w-full bg-neutral-500 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
            <div className="mx-auto max-w-6xl">
              <span className="bg-primary mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium text-black">
                {category}
              </span>

              <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                {post?.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-black">
                    {author
                      ?.split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-white">{author}</p>
                    <p className="text-sm text-neutral-300">
                      {(() => {
                        try {
                          const date = new Date(post?.createdAt || 0);
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

                <div className="flex items-center space-x-4 text-neutral-300">
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    <span>10 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Article Content */}
          <div className="relative">
            {/* Share buttons sidebar */}
            <div className="fixed top-1/2 left-8 hidden -translate-y-1/2 flex-col space-y-4 lg:flex">
              <button className="hover:text-primary rounded-full bg-neutral-900 p-3 text-neutral-300 transition-colors duration-300">
                <Share2 size={20} />
              </button>
              <button className="hover:text-primary rounded-full bg-neutral-900 p-3 text-neutral-300 transition-colors duration-300">
                <Bookmark size={20} />
              </button>
            </div>

            {/* Main content */}
            <article className="prose prose-invert prose-purple mb-12 max-w-none">
              <p className="mb-8 text-xl leading-relaxed text-neutral-300">
                {""}
              </p>

              <div className="blog-content space-y-6 text-neutral-300">
                {""}
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="bg-primary rounded-full px-3 py-1 text-sm font-medium text-black">
                  {post?.tag === "NOI_BAT" ? "Nổi bật" : "Phổ biến"}
                </span>
              </div>
              <div className="my-5">{post?.description}</div>
              <div
                className="my-5"
                dangerouslySetInnerHTML={{ __html: post?.content || "" }}
              />
            </article>

            {/* Comments Section */}
            {/* <Comments postId={""} /> */}
          </div>

          {/* Related Posts */}
          <RelatedPosts
            categoryId={post?.categoryId || 0}
            currentPostId={Number(id)}
          />

          {/* Newsletter */}
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
