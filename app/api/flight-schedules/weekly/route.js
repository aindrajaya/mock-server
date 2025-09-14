import { NextResponse } from "next/server"
import { generateWeeklyRoutes } from "@/lib/mock-data/flight-schedules"

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (err) {
      // Try tolerant parsing for common PowerShell/curl quoting issues
      const raw = await request.text().catch(() => '')
      let parsed = null
      const trimmed = (raw || '').trim()
      try {
        // strip outer single quotes if present
        let candidate = trimmed
        if (candidate.startsWith("'") && candidate.endsWith("'")) {
          candidate = candidate.slice(1, -1)
        }
        // If no double quotes found but single quotes present, try replacing
        if (!/"/.test(candidate) && /'/.test(candidate)) {
          candidate = candidate.replace(/'/g, '"')
        }
        parsed = JSON.parse(candidate)
      } catch (err2) {
        console.error('Invalid JSON received for weekly schedules, raw body:', raw)
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
      }
      body = parsed
    }
      if (!body.origin || !body.destination) {
      return NextResponse.json({ error: "Missing required field: origin or destination" }, { status: 400, headers: CORS_HEADERS })
    }
    const availableRoutes = generateWeeklyRoutes(body, 3)
    return NextResponse.json({ availableRoutes }, { status: 200, headers: CORS_HEADERS })
  } catch (error) {
    console.error('Error in flight-schedules/weekly:', error)
    return NextResponse.json({ error: 'Failed to fetch weekly schedules' }, { status: 500, headers: CORS_HEADERS })
  }
}
