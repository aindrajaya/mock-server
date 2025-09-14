import { generateStatusUpdates } from '@/lib/mock-data/status-updates.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock status update response
    const mockUpdates = generateStatusUpdates(1);
    const mockResponse = mockUpdates[0];

    // Override with request data if provided
    if (body.sender) mockResponse.sender = body.sender;
    if (body.awbNumber) mockResponse.awbNumber = body.awbNumber;
    if (body.statusCode) mockResponse.statusCode = body.statusCode;
    if (body.statusDescription) mockResponse.statusDescription = body.statusDescription;
    if (body.location) mockResponse.location = body.location;
    if (body.flightNumber) mockResponse.flightNumber = body.flightNumber;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
