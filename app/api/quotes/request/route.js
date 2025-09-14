import { generateQuoteRequests } from '../../../lib/mock-data/quotes.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock quote response
    const mockQuotes = generateQuoteRequests(1);
    const mockResponse = mockQuotes[0];

    // Override with request data if provided
    if (body.consignor) mockResponse.consignor = body.consignor;
    if (body.shipment) mockResponse.shipment = body.shipment;
    if (body.shippingTerms) mockResponse.shippingTerms = body.shippingTerms;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
