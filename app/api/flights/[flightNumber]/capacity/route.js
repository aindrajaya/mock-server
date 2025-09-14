import { generateFlightCapacity } from '../../../lib/mock-data/flight-schedules.js';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { flightNumber } = params;

    // Get date from query params or use today
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Generate mock flight capacity response
    const mockResponse = generateFlightCapacity(flightNumber, date);

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
