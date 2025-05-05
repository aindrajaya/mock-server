import { NextResponse } from "next/server"
import { generateReports } from "@/lib/mock-data/reports"

export async function GET(request) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("startDate") || "2023-01-01"
    const endDate = searchParams.get("endDate") || "2023-12-31"
    const currency = searchParams.get("currency") || "USD"

    // Generate mock reports data
    const reports = generateReports(startDate, endDate, currency)

    return NextResponse.json(reports)
  } catch (error) {
    console.error("Error in reports API:", error)
    return NextResponse.json({ error: "Failed to fetch reports data" }, { status: 500 })
  }
}
