import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.requestedBy || !body.organization || !body.requestedStock) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['requestedBy', 'organization', 'requestedStock']
        },
        { status: 400 }
      )
    }

    // Generate mock response
    const response = {
      requestId: `REQ${Date.now()}`,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      requestedBy: body.requestedBy,
      organization: body.organization,
      requestedStock: body.requestedStock,
      estimatedProcessingTime: '2-3 business days',
      nextSteps: [
        'Request will be reviewed by airline stock management',
        'Allocation decision will be communicated via email/API',
        'Stock will be available within 5 business days of approval'
      ]
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
