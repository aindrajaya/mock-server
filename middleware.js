import { NextResponse } from 'next/server'

// Protect all /api routes with a simple API key check.
// Accepted headers:
// - Authorization: Bearer <token>
// - x-api-key: <token>
// The token is read from process.env.MOCK_SERVER_API_KEY or falls back to 'mockserver-secret'.

const API_KEY = process.env.MOCK_SERVER_API_KEY || 'mockserver-secret'

export function middleware(request) {
  const url = request.nextUrl.clone()

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight()
  }

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
    console.log(`[MIDDLEWARE] Unauthorized access attempt to ${url.pathname}`)
    console.log(`[MIDDLEWARE] Authorization header: ${authHeader ? 'present' : 'missing'}`)
    console.log(`[MIDDLEWARE] x-api-key header: ${apiKeyHeader ? 'present' : 'missing'}`)
    console.log(`[MIDDLEWARE] Provided token: ${token ? 'present' : 'empty'}`)

    const res = NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    addCorsHeaders(res)
    return res
  }

  // For authenticated requests, continue and add CORS headers
  const response = NextResponse.next()
  addCorsHeaders(response)
  return response
}

// Handle CORS preflight requests
function handleCorsPreflight() {
  const response = new NextResponse(null, { status: 200 })
  addCorsHeaders(response)
  return response
}

// Add CORS headers to response
function addCorsHeaders(response) {
  // Allow requests from any origin (adjust for production)
  response.headers.set('Access-Control-Allow-Origin', '*')

  // Allow specific methods
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Allow specific headers
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, Accept, Origin, User-Agent')

  // Allow credentials (if needed)
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  // Cache preflight response for 24 hours
  response.headers.set('Access-Control-Max-Age', '86400')
}

export const config = {
  matcher: ['/api/:path*'],
}
