import { generateDigitalPouches } from '@/lib/mock-data/digital-pouch.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock digital pouch response
    const mockPouches = generateDigitalPouches(1);
    const mockResponse = mockPouches[0];

    // Override with request data if provided
    if (body.awbNumber) mockResponse.awbNumber = body.awbNumber;
    if (body.hawbNumber) mockResponse.hawbNumber = body.hawbNumber;
    if (body.creator) mockResponse.creator = body.creator;
    if (body.documents) mockResponse.documents = body.documents;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
