import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate required fields
    if (!body.decision || !['accept', 'reject'].includes(body.decision)) {
      return NextResponse.json(
        {
          error: 'Invalid decision',
          validDecisions: ['accept', 'reject']
        },
        { status: 400 }
      )
    }

    const decision = body.decision
    const response = {
      quoteId: id,
      decision: decision,
      decidedAt: new Date().toISOString(),
      decidedBy: body.decidedBy || 'Mock User'
    }

    if (decision === 'accept') {
      response.status = 'accepted'
      response.bookingInstructions = {
        bookingReference: `BK${Date.now()}`,
        nextSteps: [
          'Proceed to booking creation',
          'Provide shipment details',
          'Upload required documents'
        ],
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    } else if (decision === 'reject') {
      response.status = 'rejected'
      response.reason = body.reason || 'No reason provided'
      response.canRequote = true
      response.requoteInstructions = {
        minimumDelay: '24 hours',
        allowedModifications: ['dates', 'weight', 'destinations']
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
