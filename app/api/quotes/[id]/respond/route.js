import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate required fields
    if (!body.selectedPricingOption || !body.consignorDetails) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['selectedPricingOption', 'consignorDetails']
        },
        { status: 400 }
      )
    }

    // Mock response - in real app, this would update the quote status
    const response = {
      quoteId: id,
      status: 'responded',
      selectedOption: body.selectedPricingOption,
      consignorProposal: {
        pricingOptionId: body.selectedPricingOption.id,
        proposedRate: body.selectedPricingOption.totalRate * 0.95, // 5% discount proposal
        proposedAmount: body.selectedPricingOption.totalAmount * 0.95,
        conditions: body.conditions || [],
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        respondedAt: new Date().toISOString(),
        respondedBy: body.consignorDetails.name || 'Mock Consignor'
      },
      nextSteps: [
        'Airline will review the counter-proposal',
        'Confirmation will be sent via email/webhook',
        'Quote will expire if not accepted within validity period'
      ]
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
