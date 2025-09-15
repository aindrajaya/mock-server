import { NextResponse } from 'next/server'

// Mock capacity data
const mockCapacity = [
  {
    flightNumber: 'AA101',
    date: '2024-01-15',
    origin: 'JFK',
    destination: 'LAX',
    aircraftType: 'B777-300ER',
    totalWeight: 100000, // kg
    availableWeight: 75000, // kg
    totalVolume: 500, // cbm
    availableVolume: 350, // cbm
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    flightNumber: 'DL202',
    date: '2024-01-15',
    origin: 'JFK',
    destination: 'FRA',
    aircraftType: 'A330-300',
    totalWeight: 85000,
    availableWeight: 60000,
    totalVolume: 420,
    availableVolume: 280,
    lastUpdated: '2024-01-15T11:15:00Z'
  },
  {
    flightNumber: 'UA303',
    date: '2024-01-16',
    origin: 'ORD',
    destination: 'LAX',
    aircraftType: 'B787-9',
    totalWeight: 78000,
    availableWeight: 52000,
    totalVolume: 380,
    availableVolume: 250,
    lastUpdated: '2024-01-16T08:45:00Z'
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const flightNumber = searchParams.get('flightNumber')
    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const date = searchParams.get('date')
    const aircraftType = searchParams.get('aircraftType')

    let filteredCapacity = [...mockCapacity]

    // Apply filters
    if (flightNumber) {
      filteredCapacity = filteredCapacity.filter(capacity =>
        capacity.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
      )
    }
    if (origin) {
      filteredCapacity = filteredCapacity.filter(capacity =>
        capacity.origin.toLowerCase() === origin.toLowerCase()
      )
    }
    if (destination) {
      filteredCapacity = filteredCapacity.filter(capacity =>
        capacity.destination.toLowerCase() === destination.toLowerCase()
      )
    }
    if (date) {
      filteredCapacity = filteredCapacity.filter(capacity => capacity.date === date)
    }
    if (aircraftType) {
      filteredCapacity = filteredCapacity.filter(capacity =>
        capacity.aircraftType.toLowerCase().includes(aircraftType.toLowerCase())
      )
    }

    return NextResponse.json({
      data: filteredCapacity,
      total: filteredCapacity.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
