"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaNewspaper, FaClock, FaUserFriends, FaBolt } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Welcome to the News App
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Your go-to source for the latest news, insights, and trending stories.
          Stay informed with real-time updates from trusted sources.
        </p>
      </motion.section>

      {/* Why Choose Us Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: FaNewspaper,
            title: "Reliable News",
            text: "Verified sources for trustworthy news.",
          },
          {
            icon: FaClock,
            title: "Real-Time Updates",
            text: "Stay ahead with instant news alerts.",
          },
          {
            icon: FaUserFriends,
            title: "User-Focused",
            text: "Personalized news based on your interests.",
          },
          {
            icon: FaBolt,
            title: "Fast & Efficient",
            text: "Optimized for speed and performance.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-slate-800 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <item.icon className="text-sky-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h2>
            <p className="text-neutral-400">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Our Mission & Vision */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <h2 className="text-3xl font-semibold text-white mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-neutral-400 max-w-3xl mx-auto">
          Our mission is to deliver unbiased, accurate, and fast news coverage,
          ensuring everyone stays informed in a world full of information
          overload. We envision a future where news is accessible, engaging, and
          meaningful.
        </p>
      </motion.section>

      {/* Meet the Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Meet Our Team
        </h2>
        <p className="text-neutral-400">
          We are a passionate team of journalists, developers, and designers
          committed to delivering the best news experience.
        </p>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-12 text-center"
      >
        <h2 className="text-3xl font-semibold text-white mb-4">
          Stay Connected
        </h2>
        <p className="text-neutral-400 mb-6">
          Follow us for the latest updates and exclusive insights.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors"
        >
          Get Started{" "}
        </Link>
      </motion.section>
    </main>
  );
}
