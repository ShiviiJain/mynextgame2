"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { GameCard } from "@/components/game-card"
import { useGames } from "@/hooks/use-games"
import { 
  Filter, 
  DollarSign, 
  Clock, 
  Loader2, 
  TrendingUp, 
  Award, 
  Users,
  Heart,
  Plus
} from "lucide-react"

interface Game {
  id: string
  title: string
  developer: string
  publisher: string
  releaseDate: string
  genres: string[]
  platforms: string[]
  rating: number
  description: string
  imageUrl: string
  price: number
  discount?: number
  tags: string[]
  playtime?: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  multiplayer: boolean
  esrbRating: string
}

interface Preferences {
  genres: string[]
  platforms: string[]
  maxPrice: number
  difficulty: string
  playtime: number
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState<Preferences>({
    genres: [],
    platforms: [],
    maxPrice: 50,
    difficulty: "",
    playtime: 50
  })

  // Use API to get all available games with real data
  const { games: apiGames, loading: gamesLoading } = useGames('featured', 100)

  const genres = [
    "Action", "Adventure", "RPG", "Strategy", "Simulation", 
    "Sports", "Racing", "Fighting", "Puzzle", "Indie", "Horror"
  ]

  const platforms = [
    "PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"
  ]

  const difficulties = [
    "Easy", "Medium", "Hard"
  ]

  const handleGenreToggle = (genre: string) => {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }))
  }

  const handlePlatformToggle = (platform: string) => {
    setPreferences(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const getFilteredGames = () => {
    if (!apiGames.length) return []

    // Debug: log all available games
    console.log('All API games:', apiGames.map(g => g.title))
    console.log('Looking for:', ["Overcooked! 2", "Supermarket Simulator", "Fall Guys", "Red Dead Redemption 2"])

    // First, get priority games with relaxed filtering
    const priorityGames = [
      "Overcooked! 2",
      "Supermarket Simulator", 
      "Fall Guys",
      "Red Dead Redemption 2"
    ]
    
    const priorityFiltered = apiGames.filter(game => 
      priorityGames.some(priorityGame => 
        game.title.toLowerCase().includes(priorityGame.toLowerCase())
      ) &&
      game.developer && 
      game.developer !== 'Independent Developer' && 
      game.developer !== 'Unknown Developer' &&
      game.description && 
      game.description !== 'No description available.' &&
      game.description.length > 20 && // More relaxed for priority games
      game.genres && 
      game.genres.length > 0 &&
      game.title !== 'The Elder Scrolls VI'
    )

    // Then get other games with more relaxed filtering
    let otherFiltered = apiGames.filter(game => 
      !priorityGames.some(priorityGame => 
        game.title.toLowerCase().includes(priorityGame.toLowerCase())
      ) &&
      game.developer && 
      game.developer !== 'Unknown Developer' &&
      game.description && 
      game.description !== 'No description available.' &&
      game.description.length > 20 && // More relaxed description requirement
      game.genres && 
      game.genres.length > 0 &&
      game.rating >= 3.5 && // Lower rating threshold to show more games
      game.imageUrl && 
      !game.imageUrl.includes('placeholder') && // No placeholder images
      game.title !== 'The Elder Scrolls VI' // Remove unreleased games
    )

    // Sort other games by rating
    otherFiltered = otherFiltered.sort((a, b) => b.rating - a.rating)
    
    // Combine: priority games first, then others sorted by rating
    let filtered = [...priorityFiltered, ...otherFiltered]
    
    // Debug: log what games we found
    console.log('Priority games found:', priorityFiltered.map(g => g.title))
    console.log('Total games found:', filtered.length)

    // Apply genre filter
    if (preferences.genres.length > 0) {
      filtered = filtered.filter(game => 
        game.genres && game.genres.some(genre => 
          preferences.genres.includes(genre)
        )
      )
    }

    // Apply platform filter
    if (preferences.platforms.length > 0) {
      filtered = filtered.filter(game => 
        game.platforms && game.platforms.some(platform => 
          preferences.platforms.includes(platform)
        )
      )
    }

    // Apply price filter
    filtered = filtered.filter(game => game.price <= preferences.maxPrice)

    // Apply playtime filter
    filtered = filtered.filter(game => (game.playtime || 0) <= preferences.playtime)

    // Apply difficulty filter
    if (preferences.difficulty) {
      filtered = filtered.filter(game => game.difficulty === preferences.difficulty)
    }

    // Return games with their original ratings
    return filtered
  }

  useEffect(() => {
    const filtered = getFilteredGames()
    setRecommendations(filtered)
  }, [apiGames, preferences])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header - Popular Games Focus */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Browse Games</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of popular games. Use filters to find exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h3>

                  {/* Genres */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-card-foreground mb-3">Genres</h4>
                    <div className="space-y-2">
                      {genres.map((genre) => (
                        <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.genres.includes(genre)}
                            onChange={() => handleGenreToggle(genre)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-muted-foreground">{genre}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-card-foreground mb-3">Platforms</h4>
                    <div className="space-y-2">
                      {platforms.map((platform) => (
                        <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.platforms.includes(platform)}
                            onChange={() => handlePlatformToggle(platform)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-muted-foreground">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Max Price */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-card-foreground mb-3 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Max Price: ${preferences.maxPrice}
                    </h4>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.maxPrice}
                      onChange={(e) => setPreferences(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  {/* Difficulty */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-card-foreground mb-3">Difficulty</h4>
                    <select
                      value={preferences.difficulty}
                      onChange={(e) => setPreferences(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Any Difficulty</option>
                      {difficulties.map((diff) => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>

                  {/* Playtime */}
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Max Playtime: {preferences.playtime}h
                    </h4>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={preferences.playtime}
                      onChange={(e) => setPreferences(prev => ({ ...prev, playtime: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Game Collection</h2>
                  <p className="text-muted-foreground">
                    {loading || gamesLoading ? "Loading games..." : `${recommendations.length} games found`}
                  </p>
                </div>
              </div>

              {loading || gamesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading games with real data...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-destructive">Error loading recommendations: {error}</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recommendations.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4 flex items-center justify-center">
                    <Filter className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No games found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find more games that match your preferences.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
