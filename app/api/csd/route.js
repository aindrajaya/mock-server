import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields for CSD
    if (!body.bookingId || !body.securityQuestions) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['bookingId', 'securityQuestions']
        },
        { status: 400 }
      )
    }

    const csdData = {
      csdId: `CSD${Date.now()}`,
      bookingId: body.bookingId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      securityDeclaration: {
        shipperName: body.shipperName,
        shipperAddress: body.shipperAddress,
        consigneeName: body.consigneeName,
        consigneeAddress: body.consigneeAddress
      },
      securityQuestions: body.securityQuestions.map(question => ({
        question: question.question,
        answer: question.answer,
        category: question.category
      })),
      screeningResults: {
        status: 'cleared',
        screenedAt: new Date().toISOString(),
        screenedBy: 'Mock Security System',
        riskLevel: 'low',
        specialMeasures: []
      },
      validity: {
        issuedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      },
      compliance: {
        meetsRegulations: true,
        standards: ['IATA Security Manual', 'EU Aviation Security'],
        certificates: ['RA1', 'RA2', 'RA3']
      }
    }

    return NextResponse.json(csdData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
