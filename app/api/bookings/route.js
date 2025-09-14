import { NextResponse } from 'next/server'
import { generateBookingACS } from '@/lib/mock-data/bookings.js'

// POST /api/bookings - Create ACS booking
export async function POST(request) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - Bearer token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    if (token !== 'mockserver-secret') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.quoteId) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'quoteId is required',
            details: { field: 'quoteId' }
          }
        },
        { status: 400 }
      )
    }

    // Generate mock booking response
    const booking = generateBookingACS(body)

    return NextResponse.json(booking, { status: 200 })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create booking',
          details: { error: error.message }
        }
      },
      { status: 500 }
    )
  }
}
