import { NextResponse } from "next/server"
import { generateDailySchedules } from "@/lib/mock-data/flight-schedules"

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
        let candidate = trimmed
        if (candidate.startsWith("'") && candidate.endsWith("'")) {
          candidate = candidate.slice(1, -1)
        }
        if (!/"/.test(candidate) && /'/.test(candidate)) {
          candidate = candidate.replace(/'/g, '"')
        }
        parsed = JSON.parse(candidate)
      } catch (err2) {
        console.error('Invalid JSON received for daily schedules, raw body:', raw)
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
      }
      body = parsed
    }
    // Basic validation
    if (!body.origin || !body.destination) {
      return NextResponse.json({ error: "Missing required field: origin or destination" }, { status: 400, headers: CORS_HEADERS })
    }
    const responseList = generateDailySchedules(body, 6)
    return NextResponse.json({ responseList }, { status: 200, headers: CORS_HEADERS })
  } catch (error) {
    console.error('Error in flight-schedules/daily:', error)
    return NextResponse.json({ error: 'Failed to fetch daily schedules' }, { status: 500, headers: CORS_HEADERS })
  }
}
