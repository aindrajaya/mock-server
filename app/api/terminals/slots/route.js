import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.terminal || !body.date || !body.timeSlot || !body.serviceType) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['terminal', 'date', 'timeSlot', 'serviceType']
        },
        { status: 400 }
      )
    }

    const slotData = {
      slotId: `SLOT${Date.now()}`,
      status: 'booked',
      bookedAt: new Date().toISOString(),
      terminal: {
        code: body.terminal.code,
        name: body.terminal.name,
        location: body.terminal.location
      },
      booking: {
        date: body.date,
        timeSlot: body.timeSlot,
        duration: body.duration || 60, // minutes
        serviceType: body.serviceType
      },
      vehicle: body.vehicle || {
        type: 'truck',
        registration: 'TBD'
      },
      cargo: body.cargo || {
        awbNumbers: [],
        totalWeight: 0,
        specialHandling: []
      },
      contact: body.contact || {
        name: 'Mock Contact',
        phone: '+1234567890',
        email: 'contact@mock.com'
      },
      requirements: {
        vctRequired: body.serviceType === 'export',
        tspRequired: body.serviceType === 'export',
        securityClearance: true
      },
      confirmation: {
        reference: `REF${Date.now()}`,
        instructions: [
          'Arrive 15 minutes before slot time',
          'Bring all required documentation',
          'Vehicle must be clean and sealed'
        ]
      }
    }

    return NextResponse.json(slotData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
