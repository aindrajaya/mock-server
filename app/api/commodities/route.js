import { NextResponse } from 'next/server'

// Mock commodities data
const mockCommodities = [
  {
    code: 'GEN',
    name: 'General Cargo',
    description: 'General merchandise and cargo',
    hsCode: '980000',
    dangerousGoods: false,
    specialHandling: []
  },
  {
    code: 'PER',
    name: 'Perishables',
    description: 'Perishable goods requiring temperature control',
    hsCode: '020000',
    dangerousGoods: false,
    specialHandling: ['PER']
  },
  {
    code: 'AVI',
    name: 'Live Animals',
    description: 'Live animals and day-old poultry',
    hsCode: '010000',
    dangerousGoods: false,
    specialHandling: ['AVI']
  },
  {
    code: 'HUM',
    name: 'Human Remains',
    description: 'Human remains and ashes',
    hsCode: '990000',
    dangerousGoods: false,
    specialHandling: ['HUM']
  },
  {
    code: 'DGR',
    name: 'Dangerous Goods',
    description: 'Hazardous materials and dangerous goods',
    hsCode: '290000',
    dangerousGoods: true,
    unNumber: 'UN1234',
    specialHandling: ['DGR']
  },
  {
    code: 'VAL',
    name: 'Valuables',
    description: 'High value cargo requiring special security',
    hsCode: '710000',
    dangerousGoods: false,
    specialHandling: ['VAL']
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const name = searchParams.get('name')
    const dangerousGoods = searchParams.get('dangerousGoods')
    const hsCode = searchParams.get('hsCode')

    let filteredCommodities = [...mockCommodities]

    // Apply filters
    if (code) {
      filteredCommodities = filteredCommodities.filter(commodity =>
        commodity.code.toLowerCase().includes(code.toLowerCase())
      )
    }
    if (name) {
      filteredCommodities = filteredCommodities.filter(commodity =>
        commodity.name.toLowerCase().includes(name.toLowerCase())
      )
    }
    if (dangerousGoods !== null) {
      const isDangerous = dangerousGoods.toLowerCase() === 'true'
      filteredCommodities = filteredCommodities.filter(commodity => commodity.dangerousGoods === isDangerous)
    }
    if (hsCode) {
      filteredCommodities = filteredCommodities.filter(commodity =>
        commodity.hsCode.startsWith(hsCode)
      )
    }

    return NextResponse.json({
      data: filteredCommodities,
      total: filteredCommodities.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
