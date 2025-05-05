// Commodity codes
const commodityCodes = ["PER", "PHR", "DG", "GEN", "VAL", "HEA", "AVI", "FRE"]

// Special handling codes
const specialHandlingCodes = ["VAL", "ICE", "AOG", "HUM", "LHO", "PER", "DGR", "MAG"]

// Shippers
const shippers = [
  "Global Logistics Ltd",
  "Fast Freight Services",
  "Air Cargo Express",
  "International Shipping Co",
  "Prime Cargo Solutions",
  "Elite Transport Systems",
  "Rapid Delivery Network",
  "Sky Freight Carriers",
  "Ocean Air Logistics",
  "Premium Cargo Services",
]

// Consignees
const consignees = [
  "Tech Innovations Inc",
  "Medical Supplies Co",
  "Fashion Imports Ltd",
  "Food Distribution Network",
  "Auto Parts Warehouse",
  "Electronics Wholesale",
  "Pharmaceutical Distributors",
  "Retail Chain Supplies",
  "Manufacturing Components",
  "Industrial Equipment Co",
]

// Rate plans
const ratePlans = ["Standard Rates", "Premium Rates", "Express Rates", "Economy Rates", "Special Rates"]

// Product types
const productTypes = ["Base Rate", "Express", "Priority", "Economy", "Special Handling"]

// Currencies
const currencies = ["USD", "EUR", "GBP", "PKR", "AED", "SAR"]

// Nature of goods descriptions
const goodsDescriptions = [
  "Electronic components",
  "Pharmaceutical products",
  "Textile materials",
  "Automotive parts",
  "Medical equipment",
  "Fresh produce",
  "Printed materials",
  "Machine parts",
  "Consumer goods",
  "Chemical compounds",
]

// Helper function to generate a random AWB number
function generateAWBNumber() {
  const prefix = String(Math.floor(Math.random() * 900) + 100)
  const number = String(Math.floor(Math.random() * 90000000) + 10000000)
  return `${prefix}-${number}`
}

// Generate a single airway bill
function generateAirwayBill(id) {
  const pieces = Math.floor(Math.random() * 50) + 1
  const chargedWeight = Math.floor(Math.random() * 5000) + 10
  const commodityCode = commodityCodes[Math.floor(Math.random() * commodityCodes.length)]

  // Randomly decide if special handling is needed
  const hasSpecialHandling = Math.random() > 0.5
  const specialHandling = hasSpecialHandling
    ? specialHandlingCodes[Math.floor(Math.random() * specialHandlingCodes.length)]
    : null

  const shipper = shippers[Math.floor(Math.random() * shippers.length)]

  // Randomly decide if consignee is provided
  const hasConsignee = Math.random() > 0.2
  const consignee = hasConsignee ? consignees[Math.floor(Math.random() * consignees.length)] : null

  const consigneeContact = hasConsignee
    ? {
        email: `contact@${consignee?.toLowerCase().replace(/\s+/g, "")}.com`,
        phone: `+${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 1000) + 1} Business St, City, Country`,
      }
    : null

  const natureOfGoods = goodsDescriptions[Math.floor(Math.random() * goodsDescriptions.length)]
  const shipmentValue = Math.floor(Math.random() * 100000) + 1000

  // Randomly decide if valuation charges apply
  const hasValuationCharges = Math.random() > 0.7
  const valuationCharges = hasValuationCharges ? Number.parseFloat((Math.random() * 5).toFixed(2)) : 0

  // Randomly decide if AWB charges apply
  const hasAWBCharges = Math.random() > 0.3
  const awbCharges = hasAWBCharges ? Math.floor(Math.random() * 100) + 20 : 0

  const ratePlan = ratePlans[Math.floor(Math.random() * ratePlans.length)]
  const productType = productTypes[Math.floor(Math.random() * productTypes.length)]
  const currency = currencies[Math.floor(Math.random() * currencies.length)]

  // Calculate total charges
  const ratePerKg = 2 + Math.random() * 8 // $2-10 per kg
  const totalCharges = Number.parseFloat((chargedWeight * ratePerKg + valuationCharges + awbCharges).toFixed(2))

  // Generate activity log entries
  const activityLog = [
    {
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      action: "AWB Created",
      user: "system",
    },
    {
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)).toISOString(),
      action: "Booking Confirmed",
      user: "agent001",
    },
    {
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)).toISOString(),
      action: "Documentation Complete",
      user: "agent002",
    },
  ]

  return {
    id,
    awbNumber: generateAWBNumber(),
    pieces,
    chargedWeight,
    commodityCode,
    specialHandling,
    shipper,
    consignee,
    consigneeContact,
    natureOfGoods,
    shipmentValue,
    valuationCharges,
    awbCharges,
    ratePlan,
    productType,
    currency,
    totalCharges,
    attachments: [],
    activityLog,
  }
}

// Generate multiple airway bills
export function generateAirwayBills(count) {
  const airwayBills = []
  for (let i = 1; i <= count; i++) {
    airwayBills.push(generateAirwayBill(i))
  }
  return airwayBills
}
