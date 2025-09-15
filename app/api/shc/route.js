import { NextResponse } from 'next/server'

// Mock Special Handling Codes (SHC) data
const mockSHC = [
  {
    code: 'AVI',
    name: 'Live Animals',
    description: 'Cargo containing live animals requiring special handling',
    category: 'Special Cargo',
    requiresApproval: true
  },
  {
    code: 'PER',
    name: 'Perishables',
    description: 'Perishable cargo requiring temperature control',
    category: 'Special Cargo',
    requiresApproval: false
  },
  {
    code: 'HUM',
    name: 'Human Remains',
    description: 'Human remains or ashes',
    category: 'Special Cargo',
    requiresApproval: true
  },
  {
    code: 'VAL',
    name: 'Valuables',
    description: 'High value cargo requiring enhanced security',
    category: 'Security',
    requiresApproval: true
  },
  {
    code: 'HEA',
    name: 'Heavy Cargo',
    description: 'Cargo exceeding weight limits requiring special equipment',
    category: 'Handling',
    requiresApproval: true
  },
  {
    code: 'DGR',
    name: 'Dangerous Goods',
    description: 'Hazardous materials requiring special handling and documentation',
    category: 'Dangerous Goods',
    requiresApproval: true
  },
  {
    code: 'WET',
    name: 'Wet Lease',
    description: 'Aircraft wet lease operations',
    category: 'Operations',
    requiresApproval: false
  },
  {
    code: 'VIP',
    name: 'VIP Cargo',
    description: 'Priority handling for VIP shipments',
    category: 'Priority',
    requiresApproval: false
  }
]

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const name = searchParams.get('name')
    const category = searchParams.get('category')
    const requiresApproval = searchParams.get('requiresApproval')

    let filteredSHC = [...mockSHC]

    // Apply filters
    if (code) {
      filteredSHC = filteredSHC.filter(shc =>
        shc.code.toLowerCase().includes(code.toLowerCase())
      )
    }
    if (name) {
      filteredSHC = filteredSHC.filter(shc =>
        shc.name.toLowerCase().includes(name.toLowerCase())
      )
    }
    if (category) {
      filteredSHC = filteredSHC.filter(shc =>
        shc.category.toLowerCase().includes(category.toLowerCase())
      )
    }
    if (requiresApproval !== null) {
      const needsApproval = requiresApproval.toLowerCase() === 'true'
      filteredSHC = filteredSHC.filter(shc => shc.requiresApproval === needsApproval)
    }

    return NextResponse.json({
      data: filteredSHC,
      total: filteredSHC.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
