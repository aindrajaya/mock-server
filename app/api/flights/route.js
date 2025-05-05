import { NextResponse } from "next/server"
import { generateFlights } from "@/lib/mock-data/flights"

export async function GET(request) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const origin = searchParams.get("origin")
    const destination = searchParams.get("destination")
    const status = searchParams.get("status")
    const date = searchParams.get("date")

    // Generate mock flights data
    let flights = generateFlights(50)

    // Apply filters if provided
    if (origin) {
      flights = flights.filter((flight) => flight.origin.toLowerCase().includes(origin.toLowerCase()))
    }
    if (destination) {
      flights = flights.filter((flight) => flight.destination.toLowerCase().includes(destination.toLowerCase()))
    }
    if (status) {
      flights = flights.filter((flight) => flight.status.toLowerCase() === status.toLowerCase())
    }
    if (date) {
      flights = flights.filter((flight) => flight.date === date)
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedFlights = flights.slice(startIndex, endIndex)

    // Prepare response
    const response = {
      data: paginatedFlights,
      pagination: {
        total: flights.length,
        page,
        limit,
        pages: Math.ceil(flights.length / limit),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in flights API:", error)
    return NextResponse.json({ error: "Failed to fetch flights data" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "flight",
      "date",
      "origin",
      "departureTime",
      "destination",
      "arrivalTime",
      "weight",
      "volume",
      "status",
      "baseRate",
      "aircraftType",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate flight format (e.g., PK202)
    const flightRegex = /^[A-Z]{2}\d{1,4}$/
    if (!flightRegex.test(body.flight)) {
      return NextResponse.json({ error: "Flight ID must follow format (e.g., PK202)" }, { status: 400 })
    }

    // More validations could be added here based on the requirements

    // Mock successful creation
    return NextResponse.json(
      {
        message: "Flight created successfully",
        data: { ...body, id: Math.floor(Math.random() * 10000) },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating flight:", error)
    return NextResponse.json({ error: "Failed to create flight" }, { status: 500 })
  }
}
