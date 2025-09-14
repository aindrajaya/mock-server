import { NextResponse } from "next/server"
import { generateWeeklyRoutes } from "@/lib/mock-data/flight-schedules"

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.origin || !body.destination) {
      return NextResponse.json({ error: "Missing required field: origin or destination" }, { status: 400 })
    }
    const availableRoutes = generateWeeklyRoutes(body, 3)
    return NextResponse.json({ availableRoutes })
  } catch (error) {
    console.error('Error in flight-schedules/weekly:', error)
    return NextResponse.json({ error: 'Failed to fetch weekly schedules' }, { status: 500 })
  }
}
