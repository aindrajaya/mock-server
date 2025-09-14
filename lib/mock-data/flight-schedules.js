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

// Additional mock data for ACS Flight Schedule APIs
const aircraftTypes = [
  "B777-300ER", "B747-400F", "A330-200F", "A350-900", "MD-11F", "B767-300F"
];

const airports = ["KHI", "LHE", "ISB", "DXB", "DOH", "IST", "FRA", "LHR", "CDG", "AMS"];

const airlinesACS = [
  { code: "PK", name: "Pakistan International Airlines" },
  { code: "EK", name: "Emirates" },
  { code: "QR", name: "Qatar Airways" },
  { code: "TK", name: "Turkish Airlines" }
];

const operatingDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Generate flight schedule for ACS API
export function generateFlightScheduleACS(id) {
  const airline = airlinesACS[Math.floor(Math.random() * airlinesACS.length)];
  const flightNumber = `${airline.code}-${Math.floor(Math.random() * 900) + 100}`;

  const originIndex = Math.floor(Math.random() * airports.length);
  let destinationIndex;
  do {
    destinationIndex = Math.floor(Math.random() * airports.length);
  } while (destinationIndex === originIndex);

  const origin = airports[originIndex];
  const destination = airports[destinationIndex];

  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30) + 1);

  const departureTime = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00Z`;
  const flightDuration = 4 + Math.random() * 12; // 4-16 hours
  const arrivalTime = new Date(departureDate.getTime() + flightDuration * 60 * 60 * 1000);
  const arrivalTimeString = `${String(arrivalTime.getUTCHours()).padStart(2, '0')}:${String(arrivalTime.getUTCMinutes()).padStart(2, '0')}:00Z`;

  const aircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];

  // Random cargo capacity based on aircraft type
  const weightCapacity = 10000 + Math.random() * 20000; // 10-30 tons
  const volumeCapacity = 100 + Math.random() * 200; // 100-300 cubic meters

  const scheduleOperatingDays = [];
  const numDays = Math.floor(Math.random() * 4) + 3; // 3-7 days
  const shuffledDays = [...operatingDays].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numDays; i++) {
    scheduleOperatingDays.push(shuffledDays[i]);
  }

  return {
    id,
    scheduleId: `SCH-${flightNumber.replace('-', '')}-${departureDate.toISOString().slice(0, 10).replace(/-/g, '')}`,
    flightNumber,
    aircraft,
    route: {
      departure: {
        airport: origin,
        scheduledTime: departureDate.toISOString().replace('T', 'T').slice(0, -5) + 'Z'
      },
      arrival: {
        airport: destination,
        scheduledTime: arrivalTime.toISOString().replace('T', 'T').slice(0, -5) + 'Z'
      }
    },
    cargoCapacity: {
      weight: Math.floor(weightCapacity),
      volume: Math.floor(volumeCapacity),
      unit: "kg"
    },
    operatingDays: scheduleOperatingDays.sort(),
    status: "ACTIVE",
    createdAt: new Date().toISOString()
  };
}

// Generate flight capacity for a specific flight
export function generateFlightCapacity(flightNumber, date) {
  const totalWeight = 15000 + Math.random() * 15000; // 15-30 tons
  const totalVolume = 120 + Math.random() * 180; // 120-300 m³

  const bookedWeight = totalWeight * (0.3 + Math.random() * 0.6); // 30-90% booked
  const bookedVolume = totalVolume * (0.3 + Math.random() * 0.6);

  return {
    flightNumber,
    date,
    cargoCapacity: {
      total: {
        weight: Math.floor(totalWeight),
        volume: Math.floor(totalVolume)
      },
      available: {
        weight: Math.floor(totalWeight - bookedWeight),
        volume: Math.floor(bookedVolume)
      },
      booked: {
        weight: Math.floor(bookedWeight),
        volume: Math.floor(bookedVolume)
      }
    },
    lastUpdated: new Date().toISOString()
  };
}

// Generate multiple flight schedules for ACS
export function generateFlightSchedulesACS(count) {
  const schedules = [];
  for (let i = 1; i <= count; i++) {
    schedules.push(generateFlightScheduleACS(i));
  }
  return schedules;
}
