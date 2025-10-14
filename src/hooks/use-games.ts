"use client"

import { useState, useEffect } from 'react'

export interface Game {
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

export interface UseGamesResult {
  games: Game[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useGames(type: 'featured' | 'trending' = 'featured', limit: number = 20): UseGamesResult {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGames = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/games?type=${type}&limit=${limit}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch games')
      }
      
      // Ensure data is an array and has the expected structure
      if (Array.isArray(data.data)) {
        setGames(data.data)
      } else {
        console.error('Invalid data structure:', data)
        setGames([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching games:', err)
      setGames([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [type, limit])

  return {
    games,
    loading,
    error,
    refetch: fetchGames
  }
}

export function useGameSearch(query: string, limit: number = 20): UseGamesResult {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchGames = async () => {
    if (!query.trim()) {
      setGames([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/games?type=search&q=${encodeURIComponent(query)}&limit=${limit}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to search games')
      }
      
      // Ensure data is an array and has the expected structure
      if (Array.isArray(data.data)) {
        setGames(data.data)
      } else {
        console.error('Invalid search data structure:', data)
        setGames([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error searching games:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchGames()
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [query, limit])

  return {
    games,
    loading,
    error,
    refetch: searchGames
  }
}

export function useRecommendations(preferences: {
  genres?: string[]
  platforms?: string[]
  maxPrice?: number
  playtime?: number
  difficulty?: string
}, limit: number = 10): UseGamesResult {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences, limit }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations')
      }
      
      // Ensure data is an array and has the expected structure
      if (Array.isArray(data.data)) {
        setGames(data.data)
      } else {
        console.error('Invalid recommendations data structure:', data)
        setGames([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error getting recommendations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (preferences && Object.keys(preferences).length > 0) {
      getRecommendations()
    }
  }, [preferences, limit])

  return {
    games,
    loading,
    error,
    refetch: getRecommendations
  }
}
