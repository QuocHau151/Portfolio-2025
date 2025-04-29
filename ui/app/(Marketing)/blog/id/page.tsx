import Comments from "@/components/layout/blog/Comments";
import Newsletter from "@/components/layout/blog/Newsletter";
import RelatedPosts from "@/components/layout/blog/RelatedPosts";
import { Clock, MessageSquare, Share2, Bookmark } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative mb-12 h-[60vh] overflow-hidden rounded-xl">
          <img
            src={""}
            alt={""}
            className="h-full w-full bg-neutral-500 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
            <div className="mx-auto max-w-4xl">
              <span className="bg-primary mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium text-black">
                tag
              </span>

              <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                name
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <img
                    src={""}
                    alt={""}
                    className="border-primary h-12 w-12 rounded-full border-2 object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-white">tên</p>
                    <p className="text-sm text-neutral-300">quyền</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-neutral-300">
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    <span>{""} min read</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    <span>24 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
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
                <span className="rounded-full bg-neutral-900 px-3 py-1 text-sm text-neutral-300">
                  tag
                </span>
              </div>
            </article>

            {/* Author Bio */}
            <div className="mb-12 rounded-xl bg-neutral-900 p-6">
              <div className="flex items-center">
                <img
                  src={""}
                  alt={""}
                  className="border-primary h-16 w-16 rounded-full border-2 object-cover"
                />
                <div className="ml-4">
                  <h3 className="mb-1 text-xl font-bold text-white">{""}</h3>
                  <p className="text-neutral-400">
                    Technical Writer & Developer
                  </p>
                </div>
              </div>
              <p className="mt-4 text-neutral-300">
                A passionate writer and developer with expertise in web
                technologies and software engineering. Sharing insights and
                experiences through detailed technical articles.
              </p>
            </div>

            {/* Comments Section */}
            <Comments postId={""} />
          </div>

          {/* Related Posts */}
          <RelatedPosts category={""} currentPostId={""} />

          {/* Newsletter */}
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
