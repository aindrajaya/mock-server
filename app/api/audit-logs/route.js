import { NextResponse } from 'next/server'

// Mock audit logs data
const mockAuditLogs = [
  {
    logId: 'LOG001',
    timestamp: '2024-01-15T10:30:00Z',
    action: 'booking.created',
    resource: 'booking',
    resourceId: 'BK001',
    user: {
      id: 'USER001',
      name: 'John Doe',
      role: 'booking_agent'
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mock API Client v1.0',
    changes: {
      status: { from: null, to: 'pending' },
      createdAt: { from: null, to: '2024-01-15T10:30:00Z' }
    },
    metadata: {
      source: 'api',
      sessionId: 'sess_12345'
    }
  },
  {
    logId: 'LOG002',
    timestamp: '2024-01-15T14:45:00Z',
    action: 'booking.confirmed',
    resource: 'booking',
    resourceId: 'BK001',
    user: {
      id: 'SYSTEM',
      name: 'Automated System',
      role: 'system'
    },
    ipAddress: '10.0.0.1',
    userAgent: 'Internal Processing System',
    changes: {
      status: { from: 'pending', to: 'confirmed' },
      confirmedAt: { from: null, to: '2024-01-15T14:45:00Z' }
    },
    metadata: {
      source: 'system',
      automationId: 'auto_001'
    }
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')
    const resource = searchParams.get('resource')
    const userId = searchParams.get('userId')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '50')

    let filteredLogs = [...mockAuditLogs]

    // Apply filters
    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action === action)
    }
    if (resource) {
      filteredLogs = filteredLogs.filter(log => log.resource === resource)
    }
    if (userId) {
      filteredLogs = filteredLogs.filter(log => log.user.id === userId)
    }
    if (fromDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp >= fromDate)
    }
    if (toDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp <= toDate)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedLogs,
      pagination: {
        total: filteredLogs.length,
        page,
        limit,
        pages: Math.ceil(filteredLogs.length / limit)
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
