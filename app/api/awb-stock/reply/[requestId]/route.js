import { generateAWBStockReply } from '../../../lib/mock-data/awb-stock.js';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { requestId } = params;
    const body = await request.json();

    // Generate a mock AWB stock reply response
    const mockResponse = generateAWBStockReply(requestId);

    // Override with request data if provided
    if (body.status) mockResponse.status = body.status;
    if (body.approvedQuantity) mockResponse.approvedQuantity = body.approvedQuantity;
    if (body.awbRange) mockResponse.awbRange = body.awbRange;
    if (body.deliveryMethod) mockResponse.deliveryMethod = body.deliveryMethod;
    if (body.notes) mockResponse.notes = body.notes;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
