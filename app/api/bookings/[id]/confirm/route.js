import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate the decision
    if (!body.decision || !['confirm', 'reject', 'alternate'].includes(body.decision)) {
      return NextResponse.json(
        {
          error: 'Invalid decision',
          validDecisions: ['confirm', 'reject', 'alternate']
        },
        { status: 400 }
      )
    }

    const decision = body.decision
    const response = {
      bookingId: id,
      decision: decision,
      processedAt: new Date().toISOString(),
      processedBy: 'Mock Airline System'
    }

    if (decision === 'confirm') {
      response.status = 'confirmed'
      response.confirmationNumber = `CNF${Date.now()}`
      response.allotmentDetails = {
        spaceAllocated: true,
        position: 'Main Deck',
        weightLimit: 1500,
        volumeLimit: 10.0
      }
      response.nextSteps = [
        'Submit MAWB/HAWB details',
        'Upload required documentation',
        'Schedule cargo delivery'
      ]
    } else if (decision === 'reject') {
      response.status = 'rejected'
      response.reason = body.reason || 'No capacity available'
      response.alternativeOptions = [
        {
          flightNumber: 'AA103',
          departureDate: '2024-01-21',
          availableCapacity: 800
        }
      ]
    } else if (decision === 'alternate') {
      response.status = 'alternate_offered'
      response.alternateBooking = {
        flightNumber: body.alternateFlight || 'AA103',
        departureDate: body.alternateDate || '2024-01-21',
        adjustedPricing: body.adjustedPricing || null
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
