import { NextResponse } from 'next/server'

// Mock airlines data
const mockAirlines = [
  {
    iataCode: 'AA',
    icaoCode: 'AAL',
    name: 'American Airlines',
    prefix: '001',
    country: 'US',
    alliance: 'Oneworld',
    active: true
  },
  {
    iataCode: 'DL',
    icaoCode: 'DAL',
    name: 'Delta Air Lines',
    prefix: '006',
    country: 'US',
    alliance: 'SkyTeam',
    active: true
  },
  {
    iataCode: 'UA',
    icaoCode: 'UAL',
    name: 'United Airlines',
    prefix: '016',
    country: 'US',
    alliance: 'Star Alliance',
    active: true
  },
  {
    iataCode: 'LH',
    icaoCode: 'DLH',
    name: 'Lufthansa',
    prefix: '220',
    country: 'DE',
    alliance: 'Star Alliance',
    active: true
  },
  {
    iataCode: 'AF',
    icaoCode: 'AFR',
    name: 'Air France',
    prefix: '057',
    country: 'FR',
    alliance: 'SkyTeam',
    active: true
  },
  {
    iataCode: 'KL',
    icaoCode: 'KLM',
    name: 'KLM Royal Dutch Airlines',
    prefix: '074',
    country: 'NL',
    alliance: 'SkyTeam',
    active: true
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const iataCode = searchParams.get('iataCode')
    const icaoCode = searchParams.get('icaoCode')
    const name = searchParams.get('name')
    const country = searchParams.get('country')
    const alliance = searchParams.get('alliance')
    const active = searchParams.get('active')

    let filteredAirlines = [...mockAirlines]

    // Apply filters
    if (iataCode) {
      filteredAirlines = filteredAirlines.filter(airline =>
        airline.iataCode.toLowerCase().includes(iataCode.toLowerCase())
      )
    }
    if (icaoCode) {
      filteredAirlines = filteredAirlines.filter(airline =>
        airline.icaoCode.toLowerCase().includes(icaoCode.toLowerCase())
      )
    }
    if (name) {
      filteredAirlines = filteredAirlines.filter(airline =>
        airline.name.toLowerCase().includes(name.toLowerCase())
      )
    }
    if (country) {
      filteredAirlines = filteredAirlines.filter(airline =>
        airline.country.toLowerCase() === country.toLowerCase()
      )
    }
    if (alliance) {
      filteredAirlines = filteredAirlines.filter(airline =>
        airline.alliance?.toLowerCase() === alliance.toLowerCase()
      )
    }
    if (active !== null) {
      const isActive = active.toLowerCase() === 'true'
      filteredAirlines = filteredAirlines.filter(airline => airline.active === isActive)
    }

    return NextResponse.json({
      data: filteredAirlines,
      total: filteredAirlines.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
