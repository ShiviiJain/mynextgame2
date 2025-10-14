import { NextRequest, NextResponse } from 'next/server'
import { fetchGames, getTrendingGames, searchGames } from '@/lib/gaming-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'featured'
    const limit = parseInt(searchParams.get('limit') || '20')
    const query = searchParams.get('q')

    let games

    switch (type) {
      case 'trending':
        games = await getTrendingGames(limit)
        break
      case 'search':
        if (!query) {
          return NextResponse.json({ error: 'Query parameter is required for search' }, { status: 400 })
        }
        games = await searchGames(query, limit)
        break
      case 'featured':
      default:
        games = await fetchGames(limit)
        break
    }

    return NextResponse.json({
      success: true,
      data: games,
      count: games.length
    })
  } catch (error) {
    console.error('Error in games API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    )
  }
}
