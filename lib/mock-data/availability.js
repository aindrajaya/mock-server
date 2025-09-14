// Mock generator for availability and rate information
const origins = ["DOH", "CDG", "BOM", "LHR", "FRA", "DXB", "JFK", "LAX", "SIN", "HKG"]
const destinations = ["BOM", "CDG", "DOH", "LHR", "FRA", "DXB", "JFK", "LAX", "SIN", "HKG"]

function getRandomDateWithin(days = 7) {
  const d = new Date()
  d.setDate(d.getDate() + Math.floor(Math.random() * days))
  return d.toISOString().split('T')[0]
}

function getRandomCarrier() {
  const carriers = ["QR", "EK", "EY", "TK", "SV"]
  return carriers[Math.floor(Math.random() * carriers.length)]
}

function generateAvailability(id) {
  const origin = origins[Math.floor(Math.random() * origins.length)]
  let destination
  do {
    destination = destinations[Math.floor(Math.random() * destinations.length)]
  } while (destination === origin)

  const departureDate = getRandomDateWithin(10)
  const carrier = getRandomCarrier()
  const flightNumber = `${carrier}${Math.floor(Math.random() * 900) + 100}`

  // rate details
  const chargeableWeight = Math.floor(Math.random() * 5000) + 100
  const currency = ["USD", "EUR", "QAR"][Math.floor(Math.random() * 3)]
  const ratePerKilo = Number.parseFloat((1 + Math.random() * 9).toFixed(2))
  const totalAmount = Number.parseFloat((chargeableWeight * ratePerKilo).toFixed(2))

  // availability seats/volume
  const availablePieces = Math.floor(Math.random() * 20)
  const availableWeight = Math.floor(Math.random() * 20000)

  return {
    id,
    carrier,
    flightNumber,
    origin,
    destination,
    departureDate,
    availablePieces,
    availableWeight,
    rate: {
      currencyCode: currency,
      ratePerKilo,
      chargeableWeight,
      totalAmount,
    },
  }
}

export function generateAvailabilityList(count = 20) {
  const list = []
  for (let i = 1; i <= count; i++) {
    list.push(generateAvailability(i))
  }
  return list
}
