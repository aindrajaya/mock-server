// Mock data generator for ACS bookings
export function generateBookingACS(body) {
  const now = new Date()
  const validUntil = new Date(now.getTime() + 48 * 60 * 60 * 1000) // 48 hours from now

  return {
    bookingId: `BKG-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random() * 1000).toString().padStart(3,'0')}`,
    awbNumber: body.awbNumber || generateAWBNumber(),
    status: "CONFIRMED",
    flightDetails: {
      flightNumber: body.flightDetails?.flightNumber || "PK-751",
      date: body.flightDetails?.date || now.toISOString().split('T')[0],
      departureTime: `${body.flightDetails?.date || now.toISOString().split('T')[0]}T10:30:00Z`
    },
    shipment: {
      origin: "KHI",
      destination: "LHR",
      pieces: 5,
      weight: 250.5,
      commodity: "Electronics"
    },
    validUntil: validUntil.toISOString(),
    createdAt: now.toISOString(),
    quoteId: body.quoteId,
    validityDuration: body.validityDuration || "48 hours"
  }
}

export function generateAWBNumber() {
  const airlineCode = "020"
  const serialNumber = Math.floor(Math.random() * 90000000) + 10000000
  return `${airlineCode}-${serialNumber}`
}

export function generateBookingsACS(count = 10) {
  const bookings = []
  for (let i = 0; i < count; i++) {
    const mockBody = {
      quoteId: `QUO-20250115-${(i+1).toString().padStart(3,'0')}`,
      awbNumber: generateAWBNumber(),
      flightDetails: {
        flightNumber: "PK-751",
        date: "2025-01-20"
      },
      validityDuration: "48 hours"
    }
    bookings.push(generateBookingACS(mockBody))
  }
  return bookings
}
