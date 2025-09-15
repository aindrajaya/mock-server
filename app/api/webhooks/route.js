import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.url || !body.events || !body.events.length) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['url', 'events']
        },
        { status: 400 }
      )
    }

    const webhookData = {
      webhookId: `WH${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      url: body.url,
      events: body.events,
      secret: `secret_${Date.now()}`, // In production, generate secure secret
      headers: body.headers || {},
      retryPolicy: {
        maxRetries: body.retryPolicy?.maxRetries || 3,
        retryDelay: body.retryPolicy?.retryDelay || 60, // seconds
        backoffMultiplier: body.retryPolicy?.backoffMultiplier || 2
      },
      filters: body.filters || {},
      authentication: body.authentication || {
        type: 'none'
      },
      stats: {
        totalDeliveries: 0,
        successfulDeliveries: 0,
        failedDeliveries: 0,
        lastDelivery: null
      }
    }

    return NextResponse.json(webhookData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}

export async function GET(request) {
  try {
    // Mock webhooks list
    const mockWebhooks = [
      {
        webhookId: 'WH001',
        url: 'https://api.client.com/webhooks/cargo',
        events: ['booking.confirmed', 'shipment.departed', 'shipment.arrived'],
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ]

    return NextResponse.json({
      data: mockWebhooks,
      total: mockWebhooks.length
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
