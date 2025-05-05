import { generateFlights } from "./flights"
import { generateAirwayBills } from "./airway-bills"

// Generate reports based on flights and airway bills data
export function generateReports(startDate, endDate, currency = "USD") {
  // Generate mock data
  const flights = generateFlights(100)
  const airwayBills = generateAirwayBills(200)

  // Filter data by date range
  const filteredFlights = flights.filter((flight) => flight.date >= startDate && flight.date <= endDate)

  // Calculate metrics
  const totalRevenue = airwayBills.reduce((sum, awb) => sum + awb.totalCharges, 0)
  const totalChargeableWeight = airwayBills.reduce((sum, awb) => sum + awb.chargedWeight, 0)
  const revenuePerKg = totalChargeableWeight > 0 ? totalRevenue / totalChargeableWeight : 0

  const totalFlights = filteredFlights.length

  // Calculate utilization
  const volumeUtilization =
    filteredFlights.reduce((sum, flight) => {
      const utilization = flight.maxVolume > 0 ? flight.volume / flight.maxVolume : 0
      return sum + utilization
    }, 0) / (totalFlights || 1)

  const weightUtilization =
    filteredFlights.reduce((sum, flight) => {
      const utilization = flight.maxWeight > 0 ? flight.weight / flight.maxWeight : 0
      return sum + utilization
    }, 0) / (totalFlights || 1)

  const avgRevenuePerFlight = totalFlights > 0 ? totalRevenue / totalFlights : 0
  const avgLoadPerFlight = totalFlights > 0 ? totalChargeableWeight / totalFlights : 0

  // Calculate lane performance
  const lanes = new Map()
  filteredFlights.forEach((flight) => {
    const lane = `${flight.origin}-${flight.destination}`
    if (!lanes.has(lane)) {
      lanes.set(lane, {
        origin: flight.origin,
        destination: flight.destination,
        flights: 0,
        totalWeight: 0,
        totalVolume: 0,
        totalRevenue: 0,
      })
    }

    const laneData = lanes.get(lane)
    laneData.flights += 1
    laneData.totalWeight += flight.weight
    laneData.totalVolume += flight.volume
    laneData.totalRevenue += flight.weight * flight.baseRate

    lanes.set(lane, laneData)
  })

  const lanePerformance = Array.from(lanes.values())
    .map((lane) => ({
      ...lane,
      avgWeightPerFlight: lane.flights > 0 ? lane.totalWeight / lane.flights : 0,
      avgVolumePerFlight: lane.flights > 0 ? lane.totalVolume / lane.flights : 0,
      avgRevenuePerFlight: lane.flights > 0 ? lane.totalRevenue / lane.flights : 0,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 10)

  // Calculate booking lead time (random for mock data)
  const bookingLeadTime = 2 + Math.random() * 5 // 2-7 days

  // Calculate on-time performance (random for mock data)
  const flightOnTimePercentage = 70 + Math.random() * 25 // 70-95%

  // Generate delay causes
  const delayCauses = [
    { cause: "Weather", percentage: 35 + Math.random() * 15 },
    { cause: "Technical", percentage: 20 + Math.random() * 15 },
    { cause: "Operational", percentage: 15 + Math.random() * 10 },
    { cause: "Air Traffic", percentage: 10 + Math.random() * 10 },
    { cause: "Security", percentage: 5 + Math.random() * 5 },
    { cause: "Other", percentage: 5 + Math.random() * 5 },
  ]

  // Calculate top commodity types
  const commodityCounts = new Map()
  airwayBills.forEach((awb) => {
    const count = commodityCounts.get(awb.commodityCode) || 0
    commodityCounts.set(awb.commodityCode, count + 1)
  })

  const topCommodityTypes = Array.from(commodityCounts.entries())
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Calculate top shippers
  const shipperRevenue = new Map()
  airwayBills.forEach((awb) => {
    const revenue = shipperRevenue.get(awb.shipper) || 0
    shipperRevenue.set(awb.shipper, revenue + awb.totalCharges)
  })

  const topShippers = Array.from(shipperRevenue.entries())
    .map(([shipper, revenue]) => ({ shipper, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  return {
    period: {
      startDate,
      endDate,
    },
    totalRevenue: Number.parseFloat(totalRevenue.toFixed(2)),
    revenuePerKg: Number.parseFloat(revenuePerKg.toFixed(2)),
    totalFlights,
    volumeUtilization: Number.parseFloat((volumeUtilization * 100).toFixed(2)),
    weightUtilization: Number.parseFloat((weightUtilization * 100).toFixed(2)),
    avgRevenuePerFlight: Number.parseFloat(avgRevenuePerFlight.toFixed(2)),
    avgLoadPerFlight: Number.parseFloat(avgLoadPerFlight.toFixed(2)),
    lanePerformance,
    bookingLeadTime: Number.parseFloat(bookingLeadTime.toFixed(1)),
    flightOnTimePercentage: Number.parseFloat(flightOnTimePercentage.toFixed(1)),
    delayCauses,
    topCommodityTypes,
    topShippers,
    currency,
  }
}
