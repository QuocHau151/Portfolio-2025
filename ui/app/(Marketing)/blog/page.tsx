"use client";

import CategoryFilter from "@/components/layout/blog/CategoryFilter";
import FeaturedPost from "@/components/layout/blog/FeaturedPost";
import Newsletter from "@/components/layout/blog/Newsletter";
import PostCard from "@/components/layout/blog/PostCard";
import SearchBar from "@/components/layout/blog/SearchBar";
import {
  useGetBlogsMutation,
  useGetListCategoryBlogMutation,
} from "@/queries/useBlog";
import { BlogType } from "@/schemas/blog.schema";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import React, { useEffect, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const BlogList: React.FC = () => {
  const getCategory = useGetListCategoryBlogMutation();
  const getPosts = useGetBlogsMutation();
  const categories = getCategory.data?.payload.data || [];
  const blogPosts = getPosts.data?.payload.data || [];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogType[]>([]);

  // Sort all posts by date desc
  const sortedPosts = React.useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }, [blogPosts]);

  const latestPost = sortedPosts.length > 0 ? sortedPosts[0] : null;

  useEffect(() => {
    if (!blogPosts.length) return;

    let result = [...sortedPosts];

    if (selectedCategory) {
      result = result.filter((post) => {
        const category = categories.find((c) => c.id === post.categoryId);
        return category?.name === selectedCategory;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          (post.keyword &&
            post.keyword.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Exclude latest post from grid when in default state (no search, no category)
    if (!searchQuery && !selectedCategory && latestPost) {
      result = result.filter((post) => post.id !== latestPost.id);
    }

    setFilteredPosts(result);
  }, [selectedCategory, searchQuery, blogPosts, categories, sortedPosts, latestPost]);

  return (
    <div className="pb-16 pt-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
              Blog
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-white md:text-5xl"
          >
            <span className="text-gradient">Bài viết & Chia sẻ</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            Chia sẻ kiến thức, kinh nghiệm và câu chuyện về lập trình, công nghệ
            và phát triển phần mềm.
          </motion.p>
        </motion.div>

        {/* Featured Post */}
        {latestPost && !searchQuery && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FeaturedPost post={latestPost} />
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <h2 className="text-xl font-bold text-white md:text-2xl">
              {searchQuery
                ? `Kết quả tìm kiếm "${searchQuery}"`
                : selectedCategory
                  ? `Bài viết: ${selectedCategory}`
                  : "Bài viết mới nhất"}
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <SearchBar onSearch={setSearchQuery} />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <CategoryFilter
              categories={categories}
              activeCategory={selectedCategory}
              onCategoryClick={setSelectedCategory}
            />
          </motion.div>
        </motion.div>

        {/* Post Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            key={`${searchQuery}-${selectedCategory}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <FileText className="text-muted-foreground" size={28} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Không tìm thấy bài viết
            </h3>
            <p className="max-w-md text-muted-foreground">
              Thử điều chỉnh từ khóa tìm kiếm hoặc chọn danh mục khác để tìm bài
              viết phù hợp.
            </p>
          </motion.div>
        )}

        {/* Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
};

export default BlogList;
