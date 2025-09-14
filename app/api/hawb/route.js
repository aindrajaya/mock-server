import { generateHAWBs } from '../../../lib/mock-data/hawb.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock HAWB response
    const mockHAWBs = generateHAWBs(1);
    const mockResponse = mockHAWBs[0];

    // Override with request data if provided
    if (body.aca) mockResponse.aca = body.aca;
    if (body.consignor) mockResponse.consignor = body.consignor;
    if (body.consignee) mockResponse.consignee = body.consignee;
    if (body.shipment) mockResponse.shipment = body.shipment;
    if (body.routing) mockResponse.routing = body.routing;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
