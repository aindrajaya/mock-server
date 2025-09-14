import { NextResponse } from "next/server"
import { generateAvailabilityList } from "@/lib/mock-data/availability"

export async function POST(request) {
  try {
    const body = await request.json()

    // Basic validation based on the OpenAPI: require origin, destination and routingPreference.scheduledDepartureDate
    if (!body.origin) return NextResponse.json({ error: "Missing required field: origin" }, { status: 400 })
    if (!body.destination) return NextResponse.json({ error: "Missing required field: destination" }, { status: 400 })
    if (!body.routingPreference || !body.routingPreference.scheduledDepartureDate)
      return NextResponse.json({ error: "Missing required field: routingPreference.scheduledDepartureDate" }, { status: 400 })

    // Generate mock availability list and filter by origin/destination/date
    let results = generateAvailabilityList(50)
    results = results.filter((r) => r.origin.toLowerCase() === body.origin.toLowerCase())
    results = results.filter((r) => r.destination.toLowerCase() === body.destination.toLowerCase())
    results = results.filter((r) => r.departureDate === body.routingPreference.scheduledDepartureDate)

    // If no exact matches, fallback to returning a small sample
    if (results.length === 0) results = generateAvailabilityList(10)

    const response = {
      availabilityResponseSOs: results,
      pagination: { total: results.length, page: 1, limit: results.length },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in availability API:", error)
    return NextResponse.json({ error: "Failed to fetch availability data" }, { status: 500 })
  }
}
