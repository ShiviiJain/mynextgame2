"use client"

import { useState } from "react"
import { Search, Plus, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import DecryptedText from "@/components/DecryptedText"

interface RecommendationFormProps {
  onRecommendations: (recommendations: any[]) => void
}

export function RecommendationForm({ onRecommendations }: RecommendationFormProps) {
  const [likedGames, setLikedGames] = useState<string[]>([])
  const [currentGame, setCurrentGame] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [budget, setBudget] = useState<number>(60)
  const [platform, setPlatform] = useState("")

  const addGame = () => {
    if (currentGame.trim() && !likedGames.includes(currentGame.trim())) {
      setLikedGames([...likedGames, currentGame.trim()])
      setCurrentGame("")
    }
  }

  const removeGame = (gameToRemove: string) => {
    setLikedGames(likedGames.filter(game => game !== gameToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (likedGames.length === 0) {
      setError("Please add at least one game you like")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likedGames,
          budget: budget > 0 ? budget : undefined,
          platform: platform || undefined
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations')
      }

      onRecommendations(data.recommendations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error getting recommendations:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-4 flex items-center justify-center">
          <img 
            src="/angry.png" 
            alt="Fire" 
            className="w-8 h-8 animate-bounce"
            style={{
              animation: 'float 2s ease-in-out infinite'
            }}
          />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          <DecryptedText 
            text="Ready to Find Your Next Obsession?"
            animateOn="view"
            speed={80}
            maxIterations={15}
            revealDirection="center"
            className="text-foreground"
            encryptedClassName="text-muted-foreground"
          />
        </h2>
        <p className="text-muted-foreground">
          Hey there, fellow gamer! We're about to become your new best friend. 
          Just tell us about the games that made you forget to eat, sleep, and socialize, 
          and we'll find you your next gaming soulmate! 
          <span className="text-primary font-medium"> It's like matchmaking, but for games!</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Liked Games Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Spill the Tea - What Games Made You Obsessed?
          </label>
          
          {/* Game Input */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={currentGame}
                onChange={(e) => setCurrentGame(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGame())}
                placeholder="Tell us your gaming obsession (e.g., The Witcher 3)"
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <button
              type="button"
              onClick={addGame}
              disabled={!currentGame.trim()}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Added Games */}
          {likedGames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {likedGames.map((game) => (
                <span
                  key={game}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {game}
                  <button
                    type="button"
                    onClick={() => removeGame(game)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Budget Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Budget: ${budget}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Any Platform</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo">Nintendo Switch</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || likedGames.length === 0}
          className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Working Our Magic...
            </>
          ) : (
            <>
              <img src="/angry.png" alt="Find My Next Obsession" className="mr-2 h-5 w-5" />
              Find My Next Obsession!
            </>
          )}
        </button>
      </form>
    </div>
  )
}
