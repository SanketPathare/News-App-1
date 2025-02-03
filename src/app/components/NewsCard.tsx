"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const imageVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function NewsCard({ article, index }: any) {
  const slug = `${index}-${article.title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")}`;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link
        href={`/article/${slug}`}
        className="block bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        onClick={() => {
          localStorage.setItem(
            `article-${slug}`,
            JSON.stringify({ ...article })
          );
        }}
      >
        <div className="relative h-48 rounded-t-lg overflow-hidden">
          {article.urlToImage ? (
            <motion.img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-neutral-400 text-sm line-clamp-2">
            {article.description}
          </p>
          <div className="mt-4 text-sm text-neutral-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
