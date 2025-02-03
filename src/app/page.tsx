"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/app/components/NewsCard";
import CategoryNav from "@/app/components/CategoryNav";
import SearchBar from "@/app/components/SearchBar";
import CountrySelector from "@/app/components/CountrySelector";

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async (searchQuery = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append("q", searchQuery);
      } else {
        params.append("category", category);
        params.append("country", country);
      }

      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("currentArticles", JSON.stringify(data.articles));
      setNews(data.articles);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, country]);

  return (
    <main className="min-h-screen p-4 md:p-8 mt-5">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Latest News
      </h1>

      <div className="max-w-7xl mx-auto">
        <SearchBar onSearch={fetchNews} />
        
        <CountrySelector 
          currentCountry={country} 
          onCountryChange={setCountry} 
        />
        
        <div className="flex justify-center items-center">
          <CategoryNav
            currentCategory={category}
            onCategoryChange={setCategory}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center p-4">Error: {error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}