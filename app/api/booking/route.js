import { NextResponse } from "next/server"
import { generateBookingResponse, generateCancellationResponse } from "@/lib/mock-data/booking"

export async function POST(request) {
  try {
    const body = await request.json()

    // Basic required fields inferred from booking-api.json
    const required = ["customerDetails", "documentDetails", "productCommodityDetails", "shipmentQuantityDetails", "requestRefId", "requestType", "flightItineraries"]
    for (const field of required) {
      if (!body[field]) return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }

    // Minimal validation examples
    if (!Array.isArray(body.flightItineraries) || body.flightItineraries.length === 0) {
      return NextResponse.json({ error: "flightItineraries must be a non-empty array" }, { status: 400 })
    }

    const response = generateBookingResponse(body)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in booking POST:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json()

    // Basic required fields for cancellation
    if (!body.shipmentReferenceNum && !body.documentDetails) {
      return NextResponse.json({ error: "Missing required field: shipmentReferenceNum or documentDetails" }, { status: 400 })
    }

    const response = generateCancellationResponse(body)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in booking DELETE:", error)
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 })
  }
}
