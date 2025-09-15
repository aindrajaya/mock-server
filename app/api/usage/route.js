import { NextResponse } from 'next/server'

// Mock usage data
const mockUsage = {
  tenantId: 'TENANT001',
  period: {
    from: '2024-01-01',
    to: '2024-01-31'
  },
  summary: {
    totalRequests: 15420,
    successfulRequests: 15280,
    failedRequests: 140,
    averageResponseTime: 245, // ms
    uptime: 99.7 // percentage
  },
  byEndpoint: [
    {
      endpoint: '/api/flights',
      method: 'GET',
      requests: 5200,
      successRate: 99.8,
      averageResponseTime: 180
    },
    {
      endpoint: '/api/bookings',
      method: 'POST',
      requests: 2100,
      successRate: 98.5,
      averageResponseTime: 320
    },
    {
      endpoint: '/api/quotes',
      method: 'POST',
      requests: 1800,
      successRate: 97.2,
      averageResponseTime: 450
    },
    {
      endpoint: '/api/shipments/{awb}/status',
      method: 'GET',
      requests: 4320,
      successRate: 99.9,
      averageResponseTime: 150
    }
  ],
  byDay: [
    { date: '2024-01-01', requests: 480, successRate: 99.8 },
    { date: '2024-01-02', requests: 520, successRate: 99.6 },
    { date: '2024-01-03', requests: 495, successRate: 99.8 }
  ],
  limits: {
    monthlyRequests: 50000,
    remainingRequests: 34580,
    resetDate: '2024-02-01',
    rateLimits: {
      perMinute: 100,
      perHour: 1000,
      perDay: 5000
    }
  },
  alerts: [
    {
      type: 'rate_limit_approaching',
      message: 'Monthly request limit will be reached in 3 days',
      severity: 'warning',
      timestamp: '2024-01-28T10:00:00Z'
    }
  ]
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || 'current_month'
    const groupBy = searchParams.get('groupBy') || 'endpoint'

    // In a real app, you'd calculate actual usage based on the period
    // For mock purposes, return the sample data

    return NextResponse.json(mockUsage)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
