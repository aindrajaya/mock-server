import { generatePLACIRiskAssessment } from '../../../lib/mock-data/placi.js';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { placiId } = params;

    // Generate mock PLACI risk assessment response
    const mockResponse = generatePLACIRiskAssessment(placiId);

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
