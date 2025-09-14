import { generateCargoAcceptances } from '../../../lib/mock-data/cargo-acceptance.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock cargo acceptance response
    const mockAcceptances = generateCargoAcceptances(1);
    const mockResponse = mockAcceptances[0];

    // Override with request data if provided
    if (body.gha) mockResponse.gha = body.gha;
    if (body.awbNumber) mockResponse.awbNumber = body.awbNumber;
    if (body.hawbNumber) mockResponse.hawbNumber = body.hawbNumber;
    if (body.acceptance) mockResponse.acceptance = body.acceptance;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
