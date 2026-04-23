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
          placeholder="Tìm kiếm bài viết..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pr-10 pl-12 text-sm text-white placeholder:text-muted-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary/30 focus:bg-white/[0.07] focus:ring-1 focus:ring-primary/30 focus:outline-none"
        />
        <Search
          className="absolute top-3.5 left-4 text-muted-foreground"
          size={18}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="absolute top-3.5 right-4 text-muted-foreground transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
