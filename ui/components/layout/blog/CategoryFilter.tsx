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
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          activeCategory === null
            ? "bg-primary text-black"
            : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
        }`}
        onClick={() => onCategoryClick(null)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            activeCategory === category.name
              ? "bg-primary text-black"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
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
