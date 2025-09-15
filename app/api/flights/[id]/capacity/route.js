import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Mock capacity data for specific flight
    const mockCapacity = {
      flightId: id,
      flightNumber: id,
      date: '2024-01-15',
      origin: 'JFK',
      destination: 'LAX',
      aircraftType: 'B777-300ER',
      totalWeight: 100000, // kg
      availableWeight: 75000, // kg
      totalVolume: 500, // cbm
      availableVolume: 350, // cbm
      lastUpdated: '2024-01-15T10:30:00Z',
      bookings: [
        {
          bookingId: 'BK001',
          weight: 2500,
          volume: 15
        },
        {
          bookingId: 'BK002',
          weight: 1800,
          volume: 12
        }
      ]
    }

    return NextResponse.json(mockCapacity)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
