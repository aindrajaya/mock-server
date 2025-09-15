import { NextResponse } from 'next/server'

// Import the quotes store from the main quotes route
// Note: In a real app, this would be a database
let quotesStore = []

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Find the quote
    const quote = quotesStore.find(q => q.id === id)

    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(quote)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
