import { generateDangerousGoodsDeclarations } from '@/lib/mock-data/dangerous-goods.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate a mock dangerous goods response
    const mockDeclarations = generateDangerousGoodsDeclarations(1);
    const mockResponse = mockDeclarations[0];

    // Override with request data if provided
    if (body.consignor) mockResponse.consignor = body.consignor;
    if (body.consignee) mockResponse.consignee = body.consignee;
    if (body.awbNumber) mockResponse.awbNumber = body.awbNumber;
    if (body.dangerousGoods) mockResponse.dangerousGoods = body.dangerousGoods;

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
