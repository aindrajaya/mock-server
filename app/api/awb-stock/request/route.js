import { generateAWBStockRequests } from '../../../lib/mock-data/awb-stock.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock AWB stock request response
    const mockRequests = generateAWBStockRequests(1);
    const mockResponse = mockRequests[0];

    // Override with request data if provided
    if (body.requestingParty) mockResponse.requestingParty = body.requestingParty;
    if (body.airline) mockResponse.airline = body.airline;
    if (body.quantity) mockResponse.quantity = body.quantity;
    if (body.priority) mockResponse.priority = body.priority;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
