import { NextResponse } from "next/server"
import { generateReports } from "@/lib/mock-data/reports"

export async function GET(request) {
  // Use today and 30 days from now for mock report period
  const today = new Date().toISOString().split("T")[0]
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const report = generateReports(today, endDate)
  return NextResponse.json({ report })
}
