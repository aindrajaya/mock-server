import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Support both client_credentials and password grant types
    const { grant_type, client_id, client_secret, username, password, scope } = body

    // Mock validation - in real implementation, validate against your auth system
    if (grant_type === 'client_credentials') {
      if (!client_id || !client_secret) {
        return NextResponse.json(
          { error: 'invalid_request', error_description: 'client_id and client_secret are required' },
          { status: 400 }
        )
      }
    } else if (grant_type === 'password') {
      if (!username || !password) {
        return NextResponse.json(
          { error: 'invalid_request', error_description: 'username and password are required' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'unsupported_grant_type', error_description: 'Only client_credentials and password grants are supported' },
        { status: 400 }
      )
    }

    // Mock successful token response
    const tokenResponse = {
      access_token: 'mockserver-secret-123123124',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: scope || 'read write',
      issued_at: new Date().toISOString(),
      client_id: client_id || 'mock-client',
      user_id: username || 'mock-user',
      organization: {
        id: 'ORG001',
        name: 'Mock Airlines',
        role: 'carrier'
      }
    }

    return NextResponse.json(tokenResponse)
  } catch (error) {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}
