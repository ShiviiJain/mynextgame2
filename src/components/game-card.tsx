"use client"

import { Game } from "@/lib/game-data"
import { Clock, Users, DollarSign, Tag, Heart, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface GameCardProps {
  game: Game
  className?: string
}

export function GameCard({ game, className }: GameCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  const [isAddingToPlayed, setIsAddingToPlayed] = useState(false)
  const [showWishlistAdded, setShowWishlistAdded] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  
  // Add safety checks for game data
  if (!game) {
    return null
  }
  
  const finalPrice = game.discount 
    ? (game.price || 0) * (1 - (game.discount / 100))
    : (game.price || 0)

  const handleClick = async () => {
    // If user is signed in, add to wishlist first, then navigate
    if (session) {
      try {
        // Get current profile data
        const profileResponse = await fetch(`/api/profile/${session.user?.id}`)
        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          const currentWishlist = profileData.wishlist || []
          
          // Check if game is already in wishlist
          if (!currentWishlist.find((g: any) => g.id === game.id)) {
            // Add game to wishlist
            const updatedWishlist = [...currentWishlist, {
              id: game.id,
              title: game.title,
              imageUrl: game.imageUrl,
              developer: game.developer,
              rating: game.rating
            }]
            
            // Update profile
            await fetch(`/api/profile/${session.user?.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...profileData,
                wishlist: updatedWishlist
              })
            })
            
            // Show brief confirmation
            setShowWishlistAdded(true)
            setTimeout(() => setShowWishlistAdded(false), 2000)
          }
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error)
        // Continue to game page even if wishlist update fails
      }
    }
    
    // Navigate to game page
    router.push(`/game/${encodeURIComponent(game.title)}`)
  }

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    
    if (!session) {
      alert("Please sign in to add games to your wishlist")
      return
    }

    setIsAddingToWishlist(true)
    
    try {
      // Get current profile data
      const profileResponse = await fetch(`/api/profile/${session.user?.id}`)
      if (!profileResponse.ok) throw new Error("Failed to fetch profile")
      
      const profileData = await profileResponse.json()
      const currentWishlist = profileData.wishlist || []
      
      // Check if game is already in wishlist
      if (currentWishlist.find((g: any) => g.id === game.id)) {
        alert("This game is already in your wishlist!")
        setIsAddingToWishlist(false)
        return
      }
      
      // Add game to wishlist
      const updatedWishlist = [...currentWishlist, {
        id: game.id,
        title: game.title,
        imageUrl: game.imageUrl,
        developer: game.developer,
        rating: game.rating
      }]
      
      // Update profile
      const updateResponse = await fetch(`/api/profile/${session.user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profileData,
          wishlist: updatedWishlist
        })
      })
      
      if (updateResponse.ok) {
        alert("Added to wishlist!")
      } else {
        throw new Error("Failed to update wishlist")
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      alert("Failed to add to wishlist. Please try again.")
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  const handleAddToPlayed = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    
    if (!session) {
      alert("Please sign in to add games to your played list")
      return
    }

    setIsAddingToPlayed(true)
    
    try {
      // Get current profile data
      const profileResponse = await fetch(`/api/profile/${session.user?.id}`)
      if (!profileResponse.ok) throw new Error("Failed to fetch profile")
      
      const profileData = await profileResponse.json()
      const currentPlayed = profileData.gamesPlayed || []
      
      // Check if game is already in played list
      if (currentPlayed.find((g: any) => g.id === game.id)) {
        alert("This game is already in your played list!")
        setIsAddingToPlayed(false)
        return
      }
      
      // Add game to played list
      const updatedPlayed = [...currentPlayed, {
        id: game.id,
        title: game.title,
        imageUrl: game.imageUrl,
        developer: game.developer,
        rating: game.rating
      }]
      
      // Update profile
      const updateResponse = await fetch(`/api/profile/${session.user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profileData,
          gamesPlayed: updatedPlayed
        })
      })
      
      if (updateResponse.ok) {
        alert("Added to your played games!")
      } else {
        throw new Error("Failed to update played games")
      }
    } catch (error) {
      console.error("Error adding to played games:", error)
      alert("Failed to add to played games. Please try again.")
    } finally {
      setIsAddingToPlayed(false)
    }
  }

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      {/* Game Image */}
      <div className="relative aspect-video overflow-hidden">
        {!imageError ? (
          <img
            src={game.imageUrl}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">G</div>
              <div className="text-sm text-muted-foreground font-medium">{game.title}</div>
            </div>
          </div>
        )}
        
        {/* Discount Badge */}
        {game.discount && (
          <div className="absolute top-3 left-3 rounded-full bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
            -{game.discount}%
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
          <img src="/angry.png" alt="Rating" className="h-3 w-3" />
          <span>{game.rating}</span>
        </div>

        {/* Action Buttons */}
        {session && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <button
              onClick={handleAddToPlayed}
              disabled={isAddingToPlayed}
              className="bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background/90 disabled:opacity-50"
              title="Add to played games"
            >
              <Play className="h-4 w-4 text-green-500" />
            </button>
            <button
              onClick={handleAddToWishlist}
              disabled={isAddingToWishlist}
              className="bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background/90 disabled:opacity-50"
              title="Add to wishlist"
            >
              <Heart className="h-4 w-4 text-primary" />
            </button>
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Wishlist Added Notification */}
        {showWishlistAdded && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
              <Heart className="h-4 w-4 fill-current" />
              <span>Added to wishlist!</span>
            </div>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-4 space-y-3">
        {/* Title and Developer */}
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {game.title || 'Unknown Game'}
          </h3>
          <p className="text-sm text-muted-foreground">
            by {game.developer || 'Unknown Developer'}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {game.description || 'No description available.'}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {(game.genres || []).slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              <Tag className="mr-1 h-3 w-3" />
              {genre}
            </span>
          ))}
          {(game.genres || []).length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{(game.genres || []).length - 3} more
            </span>
          )}
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{game.playtime || 0}h avg</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{game.multiplayer ? "Multiplayer" : "Single"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="rounded-full bg-muted px-2 py-1 text-xs">
              {game.esrbRating || 'E'}
            </span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {game.discount ? (
              <>
                <span className="text-lg font-bold text-card-foreground">
                  ${finalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${game.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-card-foreground">
                ${game.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleClick}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
