// Mock generator for flight schedules
const carriers = ["QR", "EK", "EY", "TK", "SV"]
const aircrafts = ["77P", "359", "77W", "332", "789"]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomTime() {
  const h = String(randomInt(0, 23)).padStart(2, "0")
  const m = String(randomInt(0, 59)).padStart(2, "0")
  return `${h}:${m}`
}

export function generateDailySchedules(reqBody, count = 5) {
  const list = []
  const fromDate = reqBody.fromDate || reqBody.date || new Date().toISOString().split('T')[0]
  for (let i = 0; i < count; i++) {
    const carrier = carriers[Math.floor(Math.random() * carriers.length)]
    const num = String(randomInt(1, 9999)).padStart(3, '0')
    const segment = `${reqBody.origin || 'AAA'}-${reqBody.destination || 'BBB'}`
    list.push({
      carrierCode: carrier,
      carrierNumber: num,
      dateOfDeparture: fromDate,
      segment,
      weight: null,
      volume: null,
      aircraft: aircrafts[Math.floor(Math.random() * aircrafts.length)],
      std: randomTime(),
      sta: randomTime(),
      operationType: reqBody.modeOfTransport ? reqBody.modeOfTransport[0] : 'PAX',
      dateOfArrival: fromDate,
    })
  }
  return list
}

export function generateWeeklyRoutes(reqBody, count = 3) {
  const routes = []
  for (let i = 0; i < count; i++) {
    const routingApts = [reqBody.origin || 'AAA', 'MID', reqBody.destination || 'BBB']
    const noOfTransits = Math.floor(Math.random() * 3)
    const routeSegmentDetails = [
      { carrierCode: carriers[i % carriers.length], carrierNumber: String(100 + i), segment: `${routingApts[0]}-${routingApts[1]}` },
      { carrierCode: carriers[(i+1) % carriers.length], carrierNumber: String(200 + i), segment: `${routingApts[1]}-${routingApts[2]}` },
    ]
    routes.push({ routingApts, noOfTransits, routeSegmentDetails })
  }
  return routes
}
