"use client"

import { Tag, Monitor, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Recommendation {
  title: string
  reason: string
  coverImage: string
  rating: number
  genres: string[]
  platforms: string[]
  price?: number
}

interface RecommendationResultsProps {
  recommendations: Recommendation[]
}

export function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  const router = useRouter()

  const handleGameClick = (title: string) => {
    router.push(`/game/${encodeURIComponent(title)}`)
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 flex items-center justify-center">
          <img src="/angry.png" alt="No recommendations" className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No recommendations found</h3>
        <p className="text-muted-foreground">
          Try adding more games or adjusting your filters to get better recommendations.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your AI Recommendations</h2>
        <p className="text-muted-foreground">
          Based on your preferences, here are {recommendations.length} games you might love:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={rec.title}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer"
            onClick={() => handleGameClick(rec.title)}
          >
            {/* Game Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={rec.coverImage}
                alt={rec.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/460x215/1a1a1a/ffffff?text=Game+Image'
                }}
              />
              
              {/* Recommendation Badge */}
              <div className="absolute top-3 left-3 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                #{index + 1} Pick
              </div>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                <img src="/angry.png" alt="Rating" className="h-3 w-3" />
                <span>{rec.rating.toFixed(1)}</span>
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Game Info */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {rec.title}
              </h3>

              {/* AI Explanation */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {rec.reason}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-1">
                {rec.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {genre}
                  </span>
                ))}
                {rec.genres.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{rec.genres.length - 3} more
                  </span>
                )}
              </div>

              {/* Platforms and Price */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Monitor className="h-3 w-3" />
                  <span>{rec.platforms.slice(0, 2).join(', ')}</span>
                  {rec.platforms.length > 2 && (
                    <span>+{rec.platforms.length - 2}</span>
                  )}
                </div>
                
                {rec.price && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span className="font-medium text-foreground">${rec.price}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button 
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleGameClick(rec.title)
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Recommendations powered by AI analysis of game descriptions, genres, and gameplay elements.
        </p>
      </div>
    </div>
  )
}
