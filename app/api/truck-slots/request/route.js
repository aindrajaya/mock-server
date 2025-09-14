import { generateTruckSlotRequests } from '@/lib/mock-data/truck-slots.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock truck slot response
    const mockSlots = generateTruckSlotRequests(1);
    const mockResponse = mockSlots[0];

    // Override with request data if provided
    if (body.requester) mockResponse.requester = body.requester;
    if (body.gha) mockResponse.gha = body.gha;
    if (body.vehicle) mockResponse.vehicle = body.vehicle;
    if (body.requestedSlot) mockResponse.requestedSlot = body.requestedSlot;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
