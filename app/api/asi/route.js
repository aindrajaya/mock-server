import { generateASIs } from '@/lib/mock-data/asi.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock ASI response
    const mockASIs = generateASIs(1);
    const mockResponse = mockASIs[0];

    // Override with request data if provided
    if (body.awbNumber) mockResponse.awbNumber = body.awbNumber;
    if (body.sender) mockResponse.sender = body.sender;
    if (body.recipients) mockResponse.recipients = body.recipients;
    if (body.shipmentDetails) mockResponse.shipmentDetails = body.shipmentDetails;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
