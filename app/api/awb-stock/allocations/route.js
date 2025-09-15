import { NextResponse } from 'next/server'

// Mock AWB stock allocations data
const mockAllocations = [
  {
    allocationId: 'ALLOC001',
    airlinePrefix: '001',
    stockRange: {
      from: '00100000000',
      to: '00100001000'
    },
    allocatedTo: {
      organizationId: 'ORG001',
      organizationName: 'Mock Airlines GSA'
    },
    allocatedAt: '2024-01-10T10:00:00Z',
    validFrom: '2024-01-15',
    validTo: '2024-12-31',
    totalStock: 1001,
    usedStock: 45,
    availableStock: 956,
    status: 'active'
  },
  {
    allocationId: 'ALLOC002',
    airlinePrefix: '006',
    stockRange: {
      from: '00650000000',
      to: '00650000500'
    },
    allocatedTo: {
      organizationId: 'ORG002',
      organizationName: 'Delta Cargo Services'
    },
    allocatedAt: '2024-01-12T14:30:00Z',
    validFrom: '2024-01-20',
    validTo: '2024-06-30',
    totalStock: 501,
    usedStock: 23,
    availableStock: 478,
    status: 'active'
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const organizationId = searchParams.get('organizationId')
    const airlinePrefix = searchParams.get('airlinePrefix')
    const status = searchParams.get('status')

    let filteredAllocations = [...mockAllocations]

    // Apply filters
    if (organizationId) {
      filteredAllocations = filteredAllocations.filter(allocation =>
        allocation.allocatedTo.organizationId === organizationId
      )
    }
    if (airlinePrefix) {
      filteredAllocations = filteredAllocations.filter(allocation =>
        allocation.airlinePrefix === airlinePrefix
      )
    }
    if (status) {
      filteredAllocations = filteredAllocations.filter(allocation =>
        allocation.status === status
      )
    }

    return NextResponse.json({
      data: filteredAllocations,
      total: filteredAllocations.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
