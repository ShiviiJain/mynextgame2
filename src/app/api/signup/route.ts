import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    console.log("=== SIMPLE SIGNUP API CALLED ===")
    
    const body = await request.json()
    console.log("Body:", body)

    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const prisma = new PrismaClient()

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      await prisma.$disconnect()
      return NextResponse.json({ error: "User exists" }, { status: 400 })
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        favoriteGenres: "[]",
        gamingPlatforms: "[]",
        favoriteGames: "[]",
        recommendations: "[]",
      }
    })

    await prisma.$disconnect()

    console.log("User created:", user.id)
    return NextResponse.json({ success: true, id: user.id })
    
  } catch (error) {
    console.error("SIGNUP ERROR:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
