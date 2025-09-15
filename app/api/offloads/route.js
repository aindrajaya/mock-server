import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.awbNumber || !body.flightNumber || !body.offloadReason || !body.pieces) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['awbNumber', 'flightNumber', 'offloadReason', 'pieces']
        },
        { status: 400 }
      )
    }

    const offloadData = {
      offloadId: `OFF${Date.now()}`,
      awbNumber: body.awbNumber,
      flightNumber: body.flightNumber,
      status: 'reported',
      reportedAt: new Date().toISOString(),
      offloadReason: body.offloadReason,
      pieces: body.pieces.map(piece => ({
        pieceId: piece.pieceId,
        weight: piece.weight,
        dimensions: piece.dimensions,
        reason: piece.reason || body.offloadReason,
        condition: piece.condition || 'good',
        photos: piece.photos || []
      })),
      totalWeight: body.pieces.reduce((sum, piece) => sum + (piece.weight || 0), 0),
      location: body.location || {
        airport: 'Unknown',
        terminal: 'Cargo Terminal'
      },
      reportedBy: body.reportedBy || 'Mock User',
      nextActions: [
        'Inspect offloaded cargo',
        'Contact shipper for disposition instructions',
        'Arrange rebooking if applicable',
        'Update shipment status'
      ],
      requiresApproval: ['damage', 'short_shipment'].includes(body.offloadReason),
      documentation: {
        required: ['Offload Report', 'Condition Photos'],
        submitted: [],
        pending: ['Offload Report', 'Condition Photos']
      }
    }

    return NextResponse.json(offloadData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
