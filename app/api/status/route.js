import { NextResponse } from "next/server"

export async function GET() {
  try {
    const payload = {
      success: true,
      apiName: "MockQR-API-v1",
      version: "1.0",
      timestamp: new Date().toISOString(),
    }
    return NextResponse.json(payload)
  } catch (error) {
    console.error("Error in status API:", error)
    return NextResponse.json({ error: "Failed health check" }, { status: 500 })
  }
}
