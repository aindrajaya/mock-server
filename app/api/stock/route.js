import { NextResponse } from "next/server"
import { generateStockResponse } from "@/lib/mock-data/stock"

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.customerDetails || !body.bookingRequestedCity) {
      return NextResponse.json({ error: 'Missing required field: customerDetails or bookingRequestedCity' }, { status: 400 })
    }
    const res = generateStockResponse(body)
    return NextResponse.json(res)
  } catch (error) {
    console.error('Error in stock API:', error)
    return NextResponse.json({ error: 'Failed to get stock' }, { status: 500 })
  }
}
