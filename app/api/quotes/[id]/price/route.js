import { NextResponse } from 'next/server'

// Mock function to generate pricing options
function generatePricingOptions(quoteId, baseQuote) {
  const options = []

  // Generate 2-3 pricing options
  const numOptions = Math.floor(Math.random() * 2) + 2

  for (let i = 0; i < numOptions; i++) {
    const baseRate = 2.5 + Math.random() * 2 // $2.50-$4.50 per kg
    const fuelSurcharge = 0.3 + Math.random() * 0.4 // $0.30-$0.70 per kg
    const securitySurcharge = 0.1 + Math.random() * 0.2 // $0.10-$0.30 per kg

    options.push({
      id: `PRICE_${quoteId}_${i + 1}`,
      quoteId: quoteId,
      flightNumber: `FL${100 + i}`,
      departureDate: baseQuote.departureDate || '2024-01-20',
      arrivalDate: baseQuote.arrivalDate || '2024-01-21',
      transitTime: '14h 30m',
      currency: 'USD',
      rates: {
        baseRate: Number(baseRate.toFixed(2)),
        fuelSurcharge: Number(fuelSurcharge.toFixed(2)),
        securitySurcharge: Number(securitySurcharge.toFixed(2)),
        totalRate: Number((baseRate + fuelSurcharge + securitySurcharge).toFixed(2))
      },
      totalAmount: Number(((baseRate + fuelSurcharge + securitySurcharge) * baseQuote.weight).toFixed(2)),
      validityPeriod: {
        from: new Date().toISOString(),
        to: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours
      },
      conditions: [
        'Subject to space availability',
        'Rate valid for 48 hours',
        'Minimum charge may apply'
      ]
    })
  }

  return options
}

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // In a real app, you'd fetch the quote from database
    // For mock purposes, create a mock quote
    const mockQuote = {
      id: id,
      origin: 'JFK',
      destination: 'LAX',
      weight: 100,
      pieces: 5,
      status: 'priced'
    }

    // Generate pricing options
    const pricingOptions = generatePricingOptions(id, mockQuote)

    const response = {
      quoteId: id,
      status: 'priced',
      pricingOptions: pricingOptions,
      generatedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
