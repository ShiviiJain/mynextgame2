"use client"

import { useState, useEffect } from "react"
import { Search, Plus, X, Loader2 } from "lucide-react"
import { useGameSearch } from "@/hooks/use-games"

interface Game {
  id: string
  title: string
  imageUrl: string
  developer: string
  rating: number
}

interface GameSearchSelectorProps {
  selectedGames: Game[]
  onGamesChange: (games: Game[]) => void
  placeholder?: string
  maxGames?: number
}

export function GameSearchSelector({ 
  selectedGames, 
  onGamesChange, 
  placeholder = "Search for games...",
  maxGames = 50
}: GameSearchSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const { games: searchResults, loading } = useGameSearch(searchQuery, 10)

  const handleAddGame = (game: Game) => {
    if (selectedGames.length >= maxGames) {
      alert(`You can only add up to ${maxGames} games`)
      return
    }
    
    if (!selectedGames.find(g => g.id === game.id)) {
      onGamesChange([...selectedGames, game])
    }
    setSearchQuery("")
    setShowResults(false)
  }

  const handleRemoveGame = (gameId: string) => {
    onGamesChange(selectedGames.filter(g => g.id !== gameId))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowResults(e.target.value.length > 0)
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        
        {/* Search Results */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center space-x-3 rounded-lg p-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleAddGame(game)}
                  >
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{game.title}</p>
                      <p className="text-xs text-muted-foreground">{game.developer}</p>
                    </div>
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </div>
            ) : searchQuery.length > 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No games found for "{searchQuery}"
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Selected Games */}
      {selectedGames.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Selected Games ({selectedGames.length}/{maxGames})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg"
              >
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="h-8 w-8 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{game.title}</p>
                  <p className="text-xs text-muted-foreground">{game.developer}</p>
                </div>
                <button
                  onClick={() => handleRemoveGame(game.id)}
                  className="p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
