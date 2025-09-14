import { NextResponse } from "next/server"
import { generateDailySchedules } from "@/lib/mock-data/flight-schedules"

export async function POST(request) {
  try {
    const body = await request.json()
    // Basic validation
    if (!body.origin || !body.destination) {
      return NextResponse.json({ error: "Missing required field: origin or destination" }, { status: 400 })
    }
    const responseList = generateDailySchedules(body, 6)
    return NextResponse.json({ responseList })
  } catch (error) {
    console.error('Error in flight-schedules/daily:', error)
    return NextResponse.json({ error: 'Failed to fetch daily schedules' }, { status: 500 })
  }
}
