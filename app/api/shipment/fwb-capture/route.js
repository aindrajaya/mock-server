import { NextResponse } from "next/server"
import { generateFwbCaptureResponse } from "@/lib/mock-data/shipments"

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.awbPrefix || !body.awbNumber) {
      return NextResponse.json({ error: 'Missing required field: awbPrefix or awbNumber' }, { status: 400 })
    }
    const res = generateFwbCaptureResponse(body)
    return NextResponse.json(res)
  } catch (error) {
    console.error('Error in shipment/fwb-capture:', error)
    return NextResponse.json({ error: 'Failed to capture FWB' }, { status: 500 })
  }
}
