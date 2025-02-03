// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
export default function ArticlePage({ params }: any) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = params;

  useEffect(() => {
    // Try to get the specific article from localStorage
    const articleData = localStorage.getItem(`article-${slug}`);

    if (articleData) {
      setArticle(JSON.parse(articleData));
    } else {
      // Fallback to checking the full articles list
      const articles = JSON.parse(
        localStorage.getItem("currentArticles") || "[]"
      );
      const index = parseInt(slug.split("-")[0]);
      const foundArticle = articles[index];

      if (foundArticle) {
        setArticle(foundArticle);
      }
    }

    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-sky-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <button
            onClick={() => router.push("/")}
            className="text-sky-500 hover:underline"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex gap-2 hover:text-sky-500">
        <ChevronsLeft />
        <button onClick={() => router.push("/")} className="mb-6">
          Back to News
        </button>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />
      )}

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          {new Date(article.publishedAt).toLocaleDateString()} | Source:{" "}
          {article.source.name}
        </p>

        <p className="text-lg mb-6">{article.description}</p>

        <div className="whitespace-pre-wrap">{article.content}</div>

        {article.url && (
          <div className="flex items-center mt-6 gap-2 ">
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex gap-2 p-1 px-4 py-2 rounded-lg whitespace-nowrap border-2 border-neutral-800 text-whiteh hover:bg-sky-500 hover:text-white"
            >
              Read full article at source
              <ChevronsRight />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
