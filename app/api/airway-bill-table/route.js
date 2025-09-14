import { NextResponse } from "next/server"
import { generateAirwayBills } from "@/lib/mock-data/airway-bills"

export async function GET() {
  // Return 50 mock airway bills
  const airwayBills = generateAirwayBills(50)
  return NextResponse.json({ airwayBills })
}
