import { NextResponse } from "next/server"
import { generateAirwayBills } from "@/lib/mock-data/airway-bills"

export async function GET(request) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const awbNumber = searchParams.get("awbNumber")
    const shipper = searchParams.get("shipper")
    const commodityCode = searchParams.get("commodityCode")

    // Generate mock airway bills data
    let airwayBills = generateAirwayBills(50)

    // Apply filters if provided
    if (awbNumber) {
      airwayBills = airwayBills.filter((awb) => awb.awbNumber.includes(awbNumber))
    }
    if (shipper) {
      airwayBills = airwayBills.filter((awb) => awb.shipper.toLowerCase().includes(shipper.toLowerCase()))
    }
    if (commodityCode) {
      airwayBills = airwayBills.filter((awb) => awb.commodityCode === commodityCode)
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedAWBs = airwayBills.slice(startIndex, endIndex)

    // Prepare response
    const response = {
      data: paginatedAWBs,
      pagination: {
        total: airwayBills.length,
        page,
        limit,
        pages: Math.ceil(airwayBills.length / limit),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in airway bills API:", error)
    return NextResponse.json({ error: "Failed to fetch airway bills data" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "awbNumber",
      "pieces",
      "chargedWeight",
      "commodityCode",
      "shipper",
      "natureOfGoods",
      "shipmentValue",
      "ratePlan",
      "productType",
      "currency",
      "totalCharges",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate AWB number format (11 digits, e.g., 106-10001902)
    const awbRegex = /^\d{3}-\d{8}$/
    if (!awbRegex.test(body.awbNumber)) {
      return NextResponse.json({ error: "AWB Number must be 11 digits (e.g., 106-10001902)" }, { status: 400 })
    }

    // Validate pieces (must be ≥ 1)
    if (body.pieces < 1) {
      return NextResponse.json({ error: "Number of pieces must be at least 1" }, { status: 400 })
    }

    // More validations could be added here based on the requirements

    // Mock successful creation
    return NextResponse.json(
      {
        message: "Airway bill created successfully",
        data: { ...body, id: Math.floor(Math.random() * 10000) },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating airway bill:", error)
    return NextResponse.json({ error: "Failed to create airway bill" }, { status: 500 })
  }
}
