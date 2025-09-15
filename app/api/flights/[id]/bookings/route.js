import { NextResponse } from 'next/server'

// Mock bookings data for flights
const mockFlightBookings = [
  {
    bookingId: 'BK001',
    awbNumber: '00112345678',
    shipper: 'Mock Shipper Inc',
    consignee: 'Mock Consignee Ltd',
    pieces: 3,
    weight: 750,
    volume: 4.2,
    commodity: 'GEN',
    status: 'confirmed',
    allotment: {
      position: 'Main Deck',
      weightAllocated: 750,
      volumeAllocated: 4.2
    }
  },
  {
    bookingId: 'BK002',
    awbNumber: '00112345679',
    shipper: 'Another Shipper Co',
    consignee: 'Another Consignee Ltd',
    pieces: 2,
    weight: 500,
    volume: 2.8,
    commodity: 'PER',
    status: 'confirmed',
    allotment: {
      position: 'Lower Deck',
      weightAllocated: 500,
      volumeAllocated: 2.8
    }
  }
]

export async function GET(request, { params }) {
  try {
    const { id } = params

    // In a real app, filter bookings by actual flightId
    // For mock purposes, return sample bookings

    return NextResponse.json({
      flightId: id,
      data: mockFlightBookings,
      total: mockFlightBookings.length,
      totalWeight: mockFlightBookings.reduce((sum, booking) => sum + booking.weight, 0),
      totalVolume: mockFlightBookings.reduce((sum, booking) => sum + booking.volume, 0),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
