"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Users, DollarSign, Tag, Monitor, Clock, Loader2, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

interface GameDetails {
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
  playtime: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  multiplayer: boolean
  esrbRating: string
}

export default function GameDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [game, setGame] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  const [showWishlistAdded, setShowWishlistAdded] = useState(false)

  // All games are now fetched from API - no hardcoded data
  useEffect(() => {
    const findGame = async () => {
      try {
        setLoading(true)
        
        // Get game title from URL
        const gameTitle = decodeURIComponent(params.id as string)
        
        // Try multiple API endpoints to find the game
        const endpoints = [
          `/api/games?type=featured&limit=100`,
          `/api/games?type=trending&limit=100`,
          `/api/games?type=search&q=${encodeURIComponent(gameTitle)}&limit=50`
        ]
        
        let apiFoundGame = null
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint)
            if (response.ok) {
              const data = await response.json()
              const games = data.data || data.games || data
              
              if (games && games.length > 0) {
                // Try exact match first
                apiFoundGame = games.find((g: any) => 
                  g.title.toLowerCase() === gameTitle.toLowerCase()
                )
                
                // If no exact match, try partial match
                if (!apiFoundGame) {
                  apiFoundGame = games.find((g: any) => 
                    g.title.toLowerCase().includes(gameTitle.toLowerCase()) ||
                    gameTitle.toLowerCase().includes(g.title.toLowerCase())
                  )
                }
                
                if (apiFoundGame) {
                  setGame(apiFoundGame)
                  return
                }
              }
            }
          } catch (err) {
            console.error(`Error fetching from ${endpoint}:`, err)
          }
        }
        
        // If still not found, show error
        setError(`Game "${gameTitle}" not found`)
      } catch (err) {
        console.error("Error finding game:", err)
        setError("Failed to load game details")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      findGame()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading game details...</p>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'The game you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const finalPrice = game.discount
    ? game.price * (1 - game.discount / 100)
    : game.price

  const handleAddToWishlist = async () => {
    if (!session) {
      alert("Please sign in to add games to your wishlist")
      return
    }

    setIsAddingToWishlist(true)
    
    try {
      // Get current profile data
      const profileResponse = await fetch(`/api/profile/${session.user?.id}`)
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        const currentWishlist = profileData.wishlist || []
        
        // Check if game is already in wishlist
        if (currentWishlist.find((g: any) => g.id === game.id)) {
          alert("This game is already on your wishlist!")
          return
        }
        
        // Add game to wishlist
        const updatedWishlist = [...currentWishlist, {
          id: game.id,
          title: game.title,
          imageUrl: game.imageUrl,
          developer: game.developer,
          price: game.price,
          rating: game.rating
        }]
        
        // Update profile
        const updateResponse = await fetch(`/api/profile/${session.user?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...profileData,
            wishlist: updatedWishlist
          })
        })
        
        if (updateResponse.ok) {
          setShowWishlistAdded(true)
          setTimeout(() => setShowWishlistAdded(false), 2000)
        } else {
          alert("Failed to add game to wishlist")
        }
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      alert("Failed to add game to wishlist")
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Game Details */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Image */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Game+Image'
                }}
              />
              {game.discount && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-medium">
                  -{game.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{game.title}</h1>
              <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <img src="/angry.png" alt="Rating" className="h-5 w-5" />
          <span className="text-lg font-semibold">{game.rating.toFixed(1)}</span>
        </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(game.releaseDate).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{game.multiplayer ? 'Multiplayer' : 'Single Player'}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">
                  ${finalPrice.toFixed(2)}
                </span>
                {game.discount && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${game.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">About This Game</h3>
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Game Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Developer & Publisher */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Developer</h4>
                <p className="text-foreground">{game.developer}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Publisher</h4>
                <p className="text-foreground">{game.publisher}</p>
              </div>
              
              {/* Genres */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      <Monitor className="mr-1 h-3 w-3" />
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Playtime & Difficulty */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Average Playtime</h4>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{game.playtime} hours</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Difficulty</h4>
                <span className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                  game.difficulty === 'Easy' && "bg-green-100 text-green-800",
                  game.difficulty === 'Medium' && "bg-yellow-100 text-yellow-800",
                  game.difficulty === 'Hard' && "bg-red-100 text-red-800"
                )}>
                  {game.difficulty}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {session && (
                <button
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                  className={cn(
                    "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors",
                    showWishlistAdded
                      ? "bg-green-600 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                    isAddingToWishlist && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isAddingToWishlist ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : showWishlistAdded ? (
                    <>
                      <Heart className="h-4 w-4 mr-2 fill-current" />
                      Added to Wishlist!
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Wishlist
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}