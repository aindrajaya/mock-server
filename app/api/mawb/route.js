import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields for MAWB
    if (!body.bookingId || !body.flightDetails || !body.shipper || !body.consignee) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['bookingId', 'flightDetails', 'shipper', 'consignee']
        },
        { status: 400 }
      )
    }

    // Generate MAWB number (3-digit prefix + 8-digit serial + check digit)
    const prefix = '001' // Mock airline prefix
    const serial = Math.floor(Math.random() * 99999999).toString().padStart(8, '0')
    const checkDigit = Math.floor(Math.random() * 7) + 1 // Simple mock check digit
    const mawbNumber = `${prefix}${serial}${checkDigit}`

    const mawbData = {
      mawbNumber: mawbNumber,
      bookingId: body.bookingId,
      status: 'created',
      createdAt: new Date().toISOString(),
      flightDetails: body.flightDetails,
      routing: body.routing || [],
      shipper: body.shipper,
      consignee: body.consignee,
      agent: body.agent || {
        name: 'Mock Cargo Agent',
        iataCode: 'AGT001',
        accountNumber: 'AGT001'
      },
      cargoDetails: body.cargoDetails || {
        totalPieces: 0,
        totalWeight: 0,
        weightUnit: 'KG',
        commodity: 'GEN'
      },
      handling: body.handling || {
        specialHandlingCodes: [],
        customsStatus: 'cleared'
      },
      documents: {
        required: ['FWB', 'FSU'],
        submitted: [],
        pending: ['FWB', 'FSU']
      }
    }

    return NextResponse.json(mawbData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
