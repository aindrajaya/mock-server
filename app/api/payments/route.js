import { generatePayments } from '../../../lib/mock-data/payments.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock payment response
    const mockPayments = generatePayments(1);
    const mockResponse = mockPayments[0];

    // Override with request data if provided
    if (body.payer) mockResponse.payer = body.payer;
    if (body.payee) mockResponse.payee = body.payee;
    if (body.amount) mockResponse.amount = body.amount;
    if (body.paymentType) mockResponse.paymentType = body.paymentType;
    if (body.reference) mockResponse.reference = body.reference;
    if (body.paymentMethod) mockResponse.paymentMethod = body.paymentMethod;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
