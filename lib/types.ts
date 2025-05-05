// Flight data types
export interface Flight {
    id: number
    flight: string // Unique flight ID (e.g., PK202)
    date: string // Flight date (YYYY-MM-DD)
    origin: string // Departure airport code
    departureTime: string // Departure time (HH:MM)
    destination: string // Arrival airport code
    arrivalTime: string // Arrival time (HH:MM)
    weight: number // Total cargo weight in kg
    volume: number // Cargo volume in m³
    status: string // Flight status
    baseRate: number // Standard cargo rate
    outputRate?: number // Final rate after adjustments
    tailNumber?: string // Aircraft registration ID
    manufacturer?: string // Aircraft manufacturer
    aircraftType: string // Aircraft model
    maxWeight?: number // Maximum cargo weight capacity
    maxVolume?: number // Maximum cargo volume capacity
  }
  
  // Airway Bill data types
  export interface AirwayBill {
    id: number
    awbNumber: string // Unique airway bill number (e.g., 106-10001902)
    pieces: number // Number of shipment pieces
    chargedWeight: number // Charged weight in kg
    commodityCode: string // Coded commodity type
    specialHandling?: string // Special handling code
    shipper: string // Sending party
    consignee?: string // Receiving party
    consigneeContact?: {
      // Consignee contact
      email: string
      phone: string
      address: string
    }
    natureOfGoods: string // Description of goods
    shipmentValue: number // Declared value of shipment
    valuationCharges?: number // Percentage fee based on value
    awbCharges?: number // Fixed AWB fee
    ratePlan: string // Pricing plan selected
    productType: string // Type of rate
    currency: string // Billing currency
    totalCharges: number // Total charges
    attachments: string[] // URLs to attached documents
    activityLog: {
      // Activity history
      timestamp: string
      action: string
      user: string
    }[]
  }
  
  // Reports data types
  export interface Report {
    period: {
      startDate: string
      endDate: string
    }
    totalRevenue: number
    revenuePerKg: number
    totalFlights: number
    volumeUtilization: number // Percentage
    weightUtilization: number // Percentage
    avgRevenuePerFlight: number
    avgLoadPerFlight: number
    lanePerformance: {
      origin: string
      destination: string
      flights: number
      totalWeight: number
      totalVolume: number
      totalRevenue: number
      avgWeightPerFlight: number
      avgVolumePerFlight: number
      avgRevenuePerFlight: number
    }[]
    bookingLeadTime: number // Average days
    flightOnTimePercentage: number
    delayCauses: {
      cause: string
      percentage: number
    }[]
    topCommodityTypes: {
      code: string
      count: number
    }[]
    topShippers: {
      shipper: string
      revenue: number
    }[]
    currency: string
  }
  