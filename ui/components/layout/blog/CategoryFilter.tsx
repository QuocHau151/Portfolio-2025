"use client";

import React from "react";

interface CategoryFilterProps {
  categories: {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdById?: number;
  }[];
  activeCategory: string | null;
  onCategoryClick: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
          activeCategory === null
            ? "border-primary/20 bg-primary/10 text-primary"
            : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10 hover:text-white"
        }`}
        onClick={() => onCategoryClick(null)}
      >
        Tất cả
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeCategory === category.name
              ? "border-primary/20 bg-primary/10 text-primary"
              : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10 hover:text-white"
          }`}
          onClick={() => onCategoryClick(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
