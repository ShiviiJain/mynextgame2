import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("Simple test API called")
    const body = await request.json()
    console.log("Received:", body)
    
    return NextResponse.json({ 
      success: true, 
      message: "API is working",
      received: body 
    })
  } catch (error) {
    console.error("Simple test error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Test failed" 
    }, { status: 500 })
  }
}
