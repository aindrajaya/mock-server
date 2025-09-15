import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate required fields
    if (!body.flightDate || !body.consignments) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['flightDate', 'consignments']
        },
        { status: 400 }
      )
    }

    const manifestData = {
      manifestId: `MAN${Date.now()}`,
      flightId: id,
      flightNumber: id, // Assuming id is the flight number
      flightDate: body.flightDate,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      submittedBy: body.submittedBy || 'Mock User',
      aircraft: body.aircraft || {
        type: 'B777-300ER',
        registration: 'N123AA'
      },
      route: body.route || {
        origin: 'JFK',
        destination: 'LAX',
        stops: []
      },
      consignments: body.consignments.map(consignment => ({
        awbNumber: consignment.awbNumber,
        shipper: consignment.shipper,
        consignee: consignment.consignee,
        pieces: consignment.pieces,
        weight: consignment.weight,
        volume: consignment.volume,
        commodity: consignment.commodity,
        specialHandlingCodes: consignment.specialHandlingCodes || [],
        position: consignment.position || 'Main Deck'
      })),
      totals: {
        totalConsignments: body.consignments.length,
        totalPieces: body.consignments.reduce((sum, c) => sum + c.pieces, 0),
        totalWeight: body.consignments.reduce((sum, c) => sum + c.weight, 0),
        totalVolume: body.consignments.reduce((sum, c) => sum + (c.volume || 0), 0)
      },
      documents: {
        required: ['FFM', 'XFFM'],
        submitted: ['FFM'],
        pending: ['XFFM']
      },
      validation: {
        isValid: true,
        warnings: [],
        errors: []
      }
    }

    return NextResponse.json(manifestData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
