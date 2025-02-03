// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Share2,
  Bookmark,
  User,
  Copy,
  Twitter,
  Facebook,
  LinkedIn,
  X,
} from "lucide-react";
import Link from "next/link";

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-pulse">
      <div className="h-8 w-32 bg-slate-800 rounded mb-6" />
      <div className="h-12 bg-slate-800 rounded mb-4 w-3/4" />
      <div className="h-[400px] bg-slate-800 rounded-lg mb-6" />
      <div className="space-y-4">
        <div className="h-4 bg-slate-800 rounded w-1/4" />
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-3/4" />
      </div>
    </div>
  );
}

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-slate-800 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 animate-fade-in">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-neutral-700 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ArticlePage({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [notification, setNotification] = useState("");
  const { slug } = params;

  useEffect(() => {
    const fetchArticle = async () => {
      const articleData = localStorage.getItem(`article-${slug}`);

      if (articleData) {
        setArticle(JSON.parse(articleData));
      } else {
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
    };

    fetchArticle();

    const handleClickOutside = (event) => {
      if (!event.target.closest(".share-menu")) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [slug]);

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = article.title;
    const shareText = article.description;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        showNotification("Shared successfully!");
      } else {
        setShowShareMenu(true);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      showNotification("Failed to share");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showNotification("Link copied to clipboard!");
      setShowShareMenu(false);
    } catch (error) {
      showNotification("Failed to copy link");
    }
  };

  const handleSocialShare = (platform) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(article.title);
    let url;

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Article not found
          </h1>
          <p className="text-neutral-400 mb-4">
            The article you're looking for might have been removed or is
            temporarily unavailable.
          </p>
          <button
            onClick={() => router.push("/")}
            className="text-sky-500 hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            <ChevronsLeft className="w-5 h-5" />
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="max-w-4xl mx-auto p-4 md:p-8">
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification("")}
        />
      )}

      <nav className="mb-8">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:text-sky-500 transition-colors"
        >
          <ChevronsLeft className="w-5 h-5" />
          <span>Back to News</span>
        </button>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <time>{formattedDate}</time>
          </div>
          {article.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span>Source:</span>
            <span className="text-sky-500">{article.source.name}</span>
          </div>
        </div>
      </header>

      {article.urlToImage && (
        <figure className="mb-8">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
          />
          {article.description && (
            <figcaption className="mt-2 text-sm text-neutral-400 italic">
              {article.description}
            </figcaption>
          )}
        </figure>
      )}

      <div className="prose prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-neutral-300 leading-relaxed">
          {article.content}
        </div>

        <div className="flex flex-wrap gap-4 mt-8 border-t border-neutral-800 pt-8">
          {article.url && (
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
            >
              Read full article
              <ChevronsRight className="w-5 h-5" />
            </Link>
          )}

          <div className="relative share-menu">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 hover:bg-slate-800 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>

            {showShareMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-slate-800 rounded-lg shadow-lg p-2 space-y-1">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-neutral-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy link
                </button>
                <button
                  onClick={() => handleSocialShare("twitter")}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-neutral-700 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleSocialShare("facebook")}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-neutral-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Share on Facebook
                </button>
                <button
                  onClick={() => handleSocialShare("linkedin")}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-neutral-700 transition-colors"
                >
                  <LinkedIn className="w-4 h-4" />
                  Share on LinkedIn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
