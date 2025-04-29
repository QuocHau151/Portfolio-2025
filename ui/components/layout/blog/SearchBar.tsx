"use client";
import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-3 pr-10 pl-12 text-neutral-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <Search
          className="absolute top-3.5 left-4 text-neutral-500"
          size={20}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute top-3.5 right-4 text-neutral-500 hover:text-neutral-300"
          >
            <X size={20} />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
