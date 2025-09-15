import { NextResponse } from 'next/server'
import { generateQuoteRequests } from '@/lib/mock-data/quotes.js'

// In-memory storage for quotes (in production, this would be a database)
let quotesStore = []

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.origin || !body.destination || !body.pieces || !body.weight) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['origin', 'destination', 'pieces', 'weight']
        },
        { status: 400 }
      )
    }

    // Generate a new quote
    const mockQuotes = generateQuoteRequests(1)
    const newQuote = {
      ...mockQuotes[0],
      id: `Q${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      // Override with request data
      origin: body.origin,
      destination: body.destination,
      pieces: body.pieces,
      weight: body.weight,
      dimensions: body.dimensions,
      commodity: body.commodity,
      specialHandlingCodes: body.specialHandlingCodes || [],
      requestedBy: body.requestedBy || 'mock-user',
      priority: body.priority || 'standard'
    }

    // Store the quote
    quotesStore.push(newQuote)

    return NextResponse.json(newQuote, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')

    let filteredQuotes = [...quotesStore]

    // Apply filters
    if (status) {
      filteredQuotes = filteredQuotes.filter(quote => quote.status === status)
    }
    if (origin) {
      filteredQuotes = filteredQuotes.filter(quote => quote.origin === origin)
    }
    if (destination) {
      filteredQuotes = filteredQuotes.filter(quote => quote.destination === destination)
    }

    return NextResponse.json({
      data: filteredQuotes,
      total: filteredQuotes.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
