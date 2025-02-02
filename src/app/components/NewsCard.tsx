import Link from 'next/link'

export default function NewsCard({ article, index }:any) {
  const slug = `${index}-${article.title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')}`

  // Check if there's a video
//   @ts-ignore
  const hasVideo = article.videoUrl && getYouTubeVideoId(article.videoUrl)

  return (
    <Link 
      href={`/article/${slug}`}
      className="block bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      onClick={() => {
        localStorage.setItem(`article-${slug}`, JSON.stringify({
          ...article,
          // Add video URL if available (you would get this from your API)
          videoUrl: article.videoUrl
        }))
      }}
    >
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l8-5-8-5z" />
              </svg>
            </div>
          </div>
        )}
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
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
        <p className="text-neutral-400 text-sm line-clamp-3">
          {article.description}
        </p>
        <div className="mt-4 text-sm text-neutral-400">
          {new Date(article.publishedAt).toLocaleDateString()}
          {hasVideo && (
            <span className="ml-2 text-red-600 font-medium">
              • Video Available
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

