"use client";
import { useState, useEffect } from "react";
import NewsCard from "@/app/components/NewsCard";
import CategoryNav from "@/app/components/CategoryNav";
import SearchBar from "@/app/components/SearchBar";

 const API_KEY = "818e3af0681c4b8cb4a018ad6f622d58";
 //const API_KEY = "d253fbc56fa147339b4cb8d393b27e26";

const BASE_URL = "https://newsapi.org/v2";

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async (searchQuery = "") => {
    try {
      setLoading(true);
      const endpoint = searchQuery
        ? `${BASE_URL}/everything?q=${searchQuery}&apiKey=${API_KEY}`
        : `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.message);
      }

      // Store articles in localStorage for article detail page
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
  }, [category]);

  return (
    <main className="min-h-screen p-4 md:p-8 ">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Latest News
      </h1>

      <div className="max-w-7xl mx-auto ">
        <SearchBar onSearch={fetchNews} />
        <div className="flex justify-center it">
          <CategoryNav
            currentCategory={category}
            onCategoryChange={setCategory}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-sky-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center p-4">Error: {error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {news.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              index={index} // Pass index for article identification
            />
          ))}
        </div>
      </div>
    </main>
  );
}
