export default function CategoryNav({
  currentCategory,
  onCategoryChange,
}: any) {
  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "health",
    "science",
    "sports",
  ];

  return (
    <nav className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-4 pb-2 px-2 sm:px-4 flex-nowrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              currentCategory === category
                ? "bg-sky-700 text-white"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}