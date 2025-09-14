import { NextResponse } from "next/server"
import { generateTrackingResponse } from "@/lib/mock-data/shipments"

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.cargoTrackingRequestSOs || !Array.isArray(body.cargoTrackingRequestSOs)) {
      return NextResponse.json({ error: 'Missing required field: cargoTrackingRequestSOs' }, { status: 400 })
    }
    // Support single item for mock convenience
    const first = body.cargoTrackingRequestSOs[0]
    const res = generateTrackingResponse(first || {})
    return NextResponse.json(res)
  } catch (error) {
    console.error('Error in shipment/track:', error)
    return NextResponse.json({ error: 'Failed to track shipment' }, { status: 500 })
  }
}
