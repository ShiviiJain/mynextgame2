import { NextRequest, NextResponse } from 'next/server'
import { fetchGames, searchGames } from '@/lib/gaming-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id

    // First try to find the game by searching for it
    const games = await searchGames(gameId, 1)
    
    if (games.length > 0) {
      return NextResponse.json({
        success: true,
        game: games[0]
      })
    }

    // If not found, try to get from our comprehensive database
    const allGames = await fetchGames(200)
    const foundGame = allGames.find(game => 
      game.id === gameId || 
      game.title.toLowerCase().includes(gameId.toLowerCase())
    )

    if (foundGame) {
      return NextResponse.json({
        success: true,
        game: foundGame
      })
    }

    return NextResponse.json(
      { error: 'Game not found' },
      { status: 404 }
    )

  } catch (error) {
    console.error('Error fetching game details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch game details' },
      { status: 500 }
    )
  }
}
