import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Mock booking data - in real app, fetch from database
    const mockBooking = {
      id: id,
      quoteId: 'Q1703123456789',
      status: 'confirmed',
      createdAt: '2024-01-15T10:30:00Z',
      confirmedAt: '2024-01-15T14:45:00Z',
      flight: {
        flightNumber: 'AA101',
        departureDate: '2024-01-20',
        origin: 'JFK',
        destination: 'LAX',
        aircraftType: 'B777-300ER'
      },
      shipment: {
        pieces: 5,
        weight: 1250, // kg
        volume: 8.5, // cbm
        commodity: 'GEN',
        specialHandlingCodes: []
      },
      parties: {
        shipper: {
          name: 'Mock Shipper Inc',
          address: '123 Shipping St, NY, USA',
          accountNumber: 'SHIP001'
        },
        consignee: {
          name: 'Mock Consignee Ltd',
          address: '456 Receiving Ave, LA, USA',
          accountNumber: 'CONS001'
        }
      },
      pricing: {
        currency: 'USD',
        totalAmount: 3125.00,
        breakdown: {
          freight: 2500.00,
          fuelSurcharge: 375.00,
          security: 125.00,
          taxes: 125.00
        }
      },
      documents: {
        required: ['Commercial Invoice', 'Packing List'],
        submitted: ['Commercial Invoice'],
        pending: ['Packing List']
      },
      timeline: [
        {
          event: 'Booking Created',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'completed'
        },
        {
          event: 'Booking Confirmed',
          timestamp: '2024-01-15T14:45:00Z',
          status: 'completed'
        },
        {
          event: 'Space Allocated',
          timestamp: '2024-01-16T09:15:00Z',
          status: 'completed'
        }
      ]
    }

    return NextResponse.json(mockBooking)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
