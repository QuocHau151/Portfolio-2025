"use client";
import CategoryFilter from "@/components/layout/blog/CategoryFilter";
import FeaturedPost from "@/components/layout/blog/FeaturedPost";
import Newsletter from "@/components/layout/blog/Newsletter";
import PostCard from "@/components/layout/blog/PostCard";
import SearchBar from "@/components/layout/blog/SearchBar";
import { blogPosts, categories } from "@/data/blogData";
import { BlogPost } from "@/types/blogTypes";
import React, { useState, useEffect } from "react";

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  useEffect(() => {
    let result = [...blogPosts];

    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    setFilteredPosts(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Featured Post */}
        {featuredPosts.length > 0 && !searchQuery && !selectedCategory && (
          <FeaturedPost post={featuredPosts[0]} />
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
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
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
