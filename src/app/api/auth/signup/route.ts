import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("=== SIGNUP API CALLED ===")
    
    const body = await request.json()
    console.log("Request body received:", { 
      name: body.name, 
      email: body.email, 
      hasPassword: !!body.password 
    })

    const { name, email, password } = body

    if (!name || !email || !password) {
      console.log("Missing fields:", { name: !!name, email: !!email, password: !!password })
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("All fields present, checking existing user...")
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log("User already exists with email:", email)
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      )
    }

    console.log("No existing user, hashing password...")
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log("Password hashed, creating user...")

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        favoriteGenres: JSON.stringify([]),
        gamingPlatforms: JSON.stringify([]),
        favoriteGames: JSON.stringify([]),
        recommendations: JSON.stringify([]),
      }
    })

    console.log("User created successfully with ID:", user.id)
    
    return NextResponse.json(
      { 
        success: true,
        message: "User created successfully", 
        userId: user.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("=== SIGNUP ERROR ===")
    console.error("Error type:", typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Full error:", error)
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Internal server error" 
      },
      { status: 500 }
    )
  }
}
