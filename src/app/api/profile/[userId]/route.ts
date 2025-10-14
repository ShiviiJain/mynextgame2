import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/lib/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        profileImage: true,
        favoriteGenres: true,
        gamingPlatforms: true,
        playTime: true,
        budget: true,
        favoriteGames: true,
        gamesPlayed: true,
        wishlist: true,
        recommendations: true,
      }
    })

    if (user) {
      // Parse JSON strings back to arrays
      user.favoriteGenres = user.favoriteGenres ? JSON.parse(user.favoriteGenres) : []
      user.gamingPlatforms = user.gamingPlatforms ? JSON.parse(user.gamingPlatforms) : []
      user.favoriteGames = user.favoriteGames ? JSON.parse(user.favoriteGames) : []
      user.gamesPlayed = user.gamesPlayed ? JSON.parse(user.gamesPlayed) : []
      user.wishlist = user.wishlist ? JSON.parse(user.wishlist) : []
      user.recommendations = user.recommendations ? JSON.parse(user.recommendations) : []
    }

    if (!user) {
      await prisma.$disconnect()
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    await prisma.$disconnect()
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { bio, favoriteGenres, gamingPlatforms, playTime, budget, favoriteGames, gamesPlayed, wishlist, profileImage } = body

    const prisma = new PrismaClient()
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        bio,
        profileImage,
        favoriteGenres: JSON.stringify(favoriteGenres || []),
        gamingPlatforms: JSON.stringify(gamingPlatforms || []),
        playTime,
        budget,
        favoriteGames: JSON.stringify(favoriteGames || []),
        gamesPlayed: JSON.stringify(gamesPlayed || []),
        wishlist: JSON.stringify(wishlist || []),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        profileImage: true,
        favoriteGenres: true,
        gamingPlatforms: true,
        playTime: true,
        budget: true,
        favoriteGames: true,
        gamesPlayed: true,
        wishlist: true,
        recommendations: true,
      }
    })

    // Parse JSON strings back to arrays
    updatedUser.favoriteGenres = updatedUser.favoriteGenres ? JSON.parse(updatedUser.favoriteGenres) : []
    updatedUser.gamingPlatforms = updatedUser.gamingPlatforms ? JSON.parse(updatedUser.gamingPlatforms) : []
    updatedUser.favoriteGames = updatedUser.favoriteGames ? JSON.parse(updatedUser.favoriteGames) : []
    updatedUser.gamesPlayed = updatedUser.gamesPlayed ? JSON.parse(updatedUser.gamesPlayed) : []
    updatedUser.wishlist = updatedUser.wishlist ? JSON.parse(updatedUser.wishlist) : []
    updatedUser.recommendations = updatedUser.recommendations ? JSON.parse(updatedUser.recommendations) : []

    await prisma.$disconnect()
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
