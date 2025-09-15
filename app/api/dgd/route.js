import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields for DGD
    if (!body.bookingId || !body.dangerousGoods || !body.dangerousGoods.length) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['bookingId', 'dangerousGoods']
        },
        { status: 400 }
      )
    }

    // Process each dangerous goods item
    const processedItems = body.dangerousGoods.map((item, index) => ({
      itemNumber: index + 1,
      unNumber: item.unNumber,
      properShippingName: item.properShippingName,
      hazardClass: item.hazardClass,
      packingGroup: item.packingGroup,
      quantity: item.quantity,
      weight: item.weight,
      packagingType: item.packagingType,
      authorization: item.authorization || 'Approved',
      validationStatus: 'valid'
    }))

    const dgdData = {
      dgdId: `DGD${Date.now()}`,
      bookingId: body.bookingId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      shipperDeclaration: {
        name: body.shipperName,
        title: body.shipperTitle,
        signature: body.signature,
        date: new Date().toISOString()
      },
      dangerousGoods: processedItems,
      validation: {
        isValid: true,
        warnings: [],
        errors: [],
        approvedBy: 'Mock DGR Handler',
        approvedAt: new Date().toISOString()
      },
      documents: {
        dgdForm: `/api/dgd/${Date.now()}/download`,
        emergencyResponse: 'Call 911 in case of emergency'
      }
    }

    return NextResponse.json(dgdData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
