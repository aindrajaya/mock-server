import { NextResponse } from 'next/server'

// Mock airports data
const mockAirports = [
  {
    iataCode: 'JFK',
    icaoCode: 'KJFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'US',
    timezone: 'America/New_York',
    latitude: 40.6413,
    longitude: -73.7781,
    active: true
  },
  {
    iataCode: 'LAX',
    icaoCode: 'KLAX',
    name: 'Los Angeles International Airport',
    city: 'Los Angeles',
    country: 'US',
    timezone: 'America/Los_Angeles',
    latitude: 33.9425,
    longitude: -118.4081,
    active: true
  },
  {
    iataCode: 'ORD',
    icaoCode: 'KORD',
    name: "O'Hare International Airport",
    city: 'Chicago',
    country: 'US',
    timezone: 'America/Chicago',
    latitude: 41.9742,
    longitude: -87.9073,
    active: true
  },
  {
    iataCode: 'FRA',
    icaoCode: 'EDDF',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'DE',
    timezone: 'Europe/Berlin',
    latitude: 50.0379,
    longitude: 8.5622,
    active: true
  },
  {
    iataCode: 'CDG',
    icaoCode: 'LFPG',
    name: 'Charles de Gaulle Airport',
    city: 'Paris',
    country: 'FR',
    timezone: 'Europe/Paris',
    latitude: 49.0097,
    longitude: 2.5479,
    active: true
  },
  {
    iataCode: 'AMS',
    icaoCode: 'EHAM',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'NL',
    timezone: 'Europe/Amsterdam',
    latitude: 52.3105,
    longitude: 4.7683,
    active: true
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const iataCode = searchParams.get('iataCode')
    const icaoCode = searchParams.get('icaoCode')
    const city = searchParams.get('city')
    const country = searchParams.get('country')

    let filteredAirports = [...mockAirports]

    // Apply filters
    if (iataCode) {
      filteredAirports = filteredAirports.filter(airport =>
        airport.iataCode.toLowerCase().includes(iataCode.toLowerCase())
      )
    }
    if (icaoCode) {
      filteredAirports = filteredAirports.filter(airport =>
        airport.icaoCode.toLowerCase().includes(icaoCode.toLowerCase())
      )
    }
    if (city) {
      filteredAirports = filteredAirports.filter(airport =>
        airport.city.toLowerCase().includes(city.toLowerCase())
      )
    }
    if (country) {
      filteredAirports = filteredAirports.filter(airport =>
        airport.country.toLowerCase() === country.toLowerCase()
      )
    }

    return NextResponse.json({
      data: filteredAirports,
      total: filteredAirports.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
