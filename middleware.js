import { NextResponse } from 'next/server'

// Protect all /api routes with a simple API key check.
// Accepted headers:
// - Authorization: Bearer <token>
// - x-api-key: <token>
// The token is read from process.env.MOCK_SERVER_API_KEY or falls back to 'mockserver-secret'.

const API_KEY = process.env.MOCK_SERVER_API_KEY || 'mockserver-secret'

export function middleware(request) {
  const url = request.nextUrl.clone()

  // Only protect API routes
  if (!url.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization') || ''
  const apiKeyHeader = request.headers.get('x-api-key') || ''

  let token = ''
  if (authHeader.toLowerCase().startsWith('bearer ')) {
    token = authHeader.slice(7).trim()
  } else if (apiKeyHeader) {
    token = apiKeyHeader.trim()
  }

  if (!token || token !== API_KEY) {
    const res = NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // Allow CORS preflight to proceed for OPTIONS requests (if client runs preflight)
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
