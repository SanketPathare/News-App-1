"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full flex justify-center">
      <div className="flex items-center gap-2 w-full sm:w-[50%]">
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            className="w-full bg-slate-800 px-4 py-2 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500 text-white placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-all duration-200 flex items-center"
        >
          Search
        </button>
      </div>
    </form>
  );
}
