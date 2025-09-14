import { generateFlightManifests } from '../../../lib/mock-data/flight-manifest.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock flight manifest response
    const mockManifests = generateFlightManifests(1);
    const mockResponse = mockManifests[0];

    // Override with request data if provided
    if (body.flightNumber) mockResponse.flightNumber = body.flightNumber;
    if (body.flightDate) mockResponse.flightDate = body.flightDate;
    if (body.consignments) mockResponse.consignments = body.consignments;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
