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

import React, { useEffect, useState } from "react";

const BlogList: React.FC = () => {
  const getCategory = useGetListCategoryBlogMutation();
  const getPosts = useGetBlogsMutation();
  const categories = getCategory.data?.payload.data || [];
  const blogPosts = getPosts.data?.payload.data || [];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogType[]>([]);
  const latestPost =
    blogPosts.length > 0 ? blogPosts[blogPosts.length - 1] : null;

  useEffect(() => {
    if (!blogPosts.length) return;

    let result = [...blogPosts];

    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter((post) => {
        // Find category name by ID
        const category = categories.find((c) => c.id === post.categoryId);
        return category?.name === selectedCategory;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          (post.keyword &&
            post.keyword.some((tag) => tag.toLowerCase().includes(query))),
      );
    }

    // Sắp xếp theo ngày tạo mới nhất
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Sắp xếp giảm dần (mới nhất lên đầu)
    });

    setFilteredPosts(result);
  }, [selectedCategory, searchQuery, blogPosts, categories]);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Featured Post */}
        {latestPost && !searchQuery && !selectedCategory && (
          <FeaturedPost post={latestPost} />
        )}

        {/* Search and Filter */}
        <div className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-white">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : selectedCategory
                ? `${selectedCategory} Articles`
                : "Latest Articles"}
          </h2>

          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryClick={setSelectedCategory}
          />
        </div>

        {/* Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="mb-2 text-2xl font-bold text-white">
              No articles found
            </h3>
            <p className="text-neutral-400">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
        {/* Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
};

export default BlogList;
