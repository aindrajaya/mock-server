import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { awb } = params
    const body = await request.json()

    // Validate required fields
    if (!body.eventCode || !body.eventTime || !body.location) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['eventCode', 'eventTime', 'location']
        },
        { status: 400 }
      )
    }

    // Mock event processing
    const eventData = {
      eventId: `EVT${Date.now()}`,
      awbNumber: awb,
      eventCode: body.eventCode,
      eventTime: body.eventTime,
      location: {
        airport: body.location.airport,
        terminal: body.location.terminal,
        coordinates: body.location.coordinates
      },
      status: 'recorded',
      recordedAt: new Date().toISOString(),
      details: body.details || {},
      attachments: body.attachments || [],
      notified: {
        webhook: true,
        email: body.notifyEmail || false,
        sms: body.notifySms || false
      }
    }

    // Add event-specific data based on event code
    switch (body.eventCode) {
      case 'RCS':
        eventData.details.receivedFrom = body.details?.receivedFrom
        eventData.details.condition = 'good'
        break
      case 'DEP':
        eventData.details.departureTime = body.eventTime
        eventData.details.loadPosition = body.details?.loadPosition
        break
      case 'ARR':
        eventData.details.arrivalTime = body.eventTime
        eventData.details.unloadPosition = body.details?.unloadPosition
        break
      case 'MAN':
        eventData.details.manifested = true
        eventData.details.position = body.details?.position
        break
    }

    return NextResponse.json(eventData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
