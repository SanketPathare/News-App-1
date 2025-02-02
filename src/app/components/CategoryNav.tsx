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
    <nav className="overflow-x-auto">
      <div className="flex space-x-4 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              currentCategory === category
                ? "bg-sky-500 text-white"
                : "bg-neutral-800  hover:bg-neutral-700"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}
