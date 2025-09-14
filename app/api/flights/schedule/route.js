import { generateFlightSchedulesACS } from '@/lib/mock-data/flight-schedules.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock flight schedule response
    const mockSchedules = generateFlightSchedulesACS(1);
    const mockResponse = mockSchedules[0];

    // Override with request data if provided
    if (body.flightNumber) mockResponse.flightNumber = body.flightNumber;
    if (body.aircraft) mockResponse.aircraft = body.aircraft;
    if (body.route) mockResponse.route = body.route;
    if (body.cargoCapacity) mockResponse.cargoCapacity = body.cargoCapacity;
    if (body.operatingDays) mockResponse.operatingDays = body.operatingDays;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
