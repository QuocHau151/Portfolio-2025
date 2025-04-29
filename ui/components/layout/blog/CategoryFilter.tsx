import React from "react";
import { Category } from "@/types/blogTypes";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          selectedCategory === null
            ? "bg-primary text-black"
            : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
        }`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            selectedCategory === category.name
              ? "bg-primary text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          }`}
          onClick={() => onSelectCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
