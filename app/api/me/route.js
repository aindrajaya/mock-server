import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // In a real implementation, you'd validate the Bearer token and get user info
    // For mock purposes, return a standard user profile

    const userProfile = {
      id: 'USER001',
      username: 'mockuser',
      email: 'user@mockairlines.com',
      firstName: 'John',
      lastName: 'Doe',
      organization: {
        id: 'ORG001',
        name: 'Mock Airlines',
        type: 'carrier',
        iataCode: 'MA',
        icaoCode: 'MCK',
        country: 'US'
      },
      roles: ['admin', 'booking_manager', 'operations'],
      scopes: ['read', 'write', 'admin'],
      preferences: {
        timezone: 'UTC',
        language: 'en',
        currency: 'USD'
      },
      lastLogin: new Date().toISOString(),
      status: 'active'
    }

    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
