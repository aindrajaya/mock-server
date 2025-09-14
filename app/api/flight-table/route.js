import { NextResponse } from "next/server"
import { generateFlights } from "@/lib/mock-data/flights"

export async function GET() {
  // Return 50 mock flights
  const flights = generateFlights(50)
  return NextResponse.json({ flights })
}
