import { NextRequest, NextResponse } from 'next/server'
import { getRecommendations } from '@/lib/gaming-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { preferences, limit = 10 } = body

    if (!preferences) {
      return NextResponse.json(
        { error: 'Preferences are required' },
        { status: 400 }
      )
    }

    const recommendations = await getRecommendations(preferences, limit)

    return NextResponse.json({
      success: true,
      data: recommendations,
      count: recommendations.length
    })
  } catch (error) {
    console.error('Error in recommendations API:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}
