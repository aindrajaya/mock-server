import { NextResponse } from 'next/server'

// Mock shipment status data
const mockShipmentStatus = {
  awbNumber: '00112345678',
  currentStatus: 'in_transit',
  lastUpdated: '2024-01-15T16:30:00Z',
  estimatedDelivery: '2024-01-16T08:00:00Z',
  timeline: [
    {
      eventCode: 'RCS',
      eventName: 'Received from Shipper',
      location: 'JFK',
      eventTime: '2024-01-15T08:30:00Z',
      details: 'Cargo received and accepted'
    },
    {
      eventCode: 'DEP',
      eventName: 'Departed',
      location: 'JFK',
      eventTime: '2024-01-15T14:15:00Z',
      details: 'Flight AA101 departed on schedule'
    },
    {
      eventCode: 'ARR',
      eventName: 'Arrived',
      location: 'ORD',
      eventTime: '2024-01-15T16:30:00Z',
      details: 'Flight AA101 arrived at connection point'
    }
  ],
  nextEvents: [
    {
      eventCode: 'DEP',
      eventName: 'Departure from ORD',
      estimatedTime: '2024-01-15T18:45:00Z',
      flight: 'AA203'
    },
    {
      eventCode: 'ARR',
      eventName: 'Arrival at LAX',
      estimatedTime: '2024-01-15T21:30:00Z',
      flight: 'AA203'
    },
    {
      eventCode: 'RCF',
      eventName: 'Received from Airline',
      estimatedTime: '2024-01-15T22:00:00Z'
    }
  ],
  documents: [
    {
      type: 'FWB',
      status: 'available',
      url: '/api/documents/fwb_00112345678'
    },
    {
      type: 'FSU',
      status: 'available',
      url: '/api/documents/fsu_00112345678'
    }
  ],
  alerts: [],
  tracking: {
    currentLocation: 'ORD',
    nextDestination: 'LAX',
    transitTime: '6h 45m',
    remainingTime: '4h 30m'
  }
}

export async function GET(request, { params }) {
  try {
    const { awb } = params

    // In a real app, fetch actual shipment data
    // For mock purposes, return sample data with the requested AWB
    const statusData = {
      ...mockShipmentStatus,
      awbNumber: awb
    }

    return NextResponse.json(statusData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
