import { generatePLACIs } from '../../../lib/mock-data/placi.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock PLACI response
    const mockPLACIs = generatePLACIs(1);
    const mockResponse = mockPLACIs[0];

    // Override with request data if provided
    if (body.airline) mockResponse.airline = body.airline;
    if (body.flightNumber) mockResponse.flightNumber = body.flightNumber;
    if (body.departureDate) mockResponse.departureDate = body.departureDate;
    if (body.consignments) mockResponse.consignments = body.consignments;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
