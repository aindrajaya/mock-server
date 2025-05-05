// Airport codes
const airports = [
    "KHI",
    "ISB",
    "LHE",
    "PEW",
    "UET",
    "SKZ",
    "MUX",
    "LYP", // Pakistan
    "DXB",
    "AUH",
    "DOH",
    "RUH",
    "JED",
    "KWI",
    "MCT", // Middle East
    "LHR",
    "CDG",
    "FRA",
    "AMS",
    "IST",
    "MAD",
    "FCO", // Europe
    "JFK",
    "LAX",
    "ORD",
    "YYZ",
    "MEX", // North America
    "SIN",
    "KUL",
    "BKK",
    "HKG",
    "PEK",
    "NRT",
    "ICN", // Asia
  ]
  
  // Airlines with their codes
  const airlines = [
    { code: "PK", name: "Pakistan International Airlines" },
    { code: "EK", name: "Emirates" },
    { code: "QR", name: "Qatar Airways" },
    { code: "TK", name: "Turkish Airlines" },
    { code: "SV", name: "Saudia" },
    { code: "EY", name: "Etihad Airways" },
  ]
  
  // Aircraft types
  const aircraftTypes = [
    { type: "Boeing 777-300ER", manufacturer: "Boeing", maxWeight: 160000, maxVolume: 650 },
    { type: "Boeing 787-9", manufacturer: "Boeing", maxWeight: 120000, maxVolume: 450 },
    { type: "Airbus A330-300", manufacturer: "Airbus", maxWeight: 140000, maxVolume: 520 },
    { type: "Airbus A350-900", manufacturer: "Airbus", maxWeight: 150000, maxVolume: 580 },
    { type: "Boeing 747-8F", manufacturer: "Boeing", maxWeight: 180000, maxVolume: 850 },
    { type: "Boeing 777F", manufacturer: "Boeing", maxWeight: 170000, maxVolume: 800 },
  ]
  
  // Flight statuses
  const statuses = ["Scheduled", "Boarding", "In Transit", "Arrived", "Delayed", "Cancelled"]
  
  // Helper function to generate a random date within the next 30 days
  function getRandomFutureDate() {
    const today = new Date()
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30))
    return futureDate.toISOString().split("T")[0]
  }
  
  // Helper function to generate a random time
  function getRandomTime() {
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0")
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0")
    return `${hours}:${minutes}`
  }
  
  // Helper function to generate a random tail number
  function getRandomTailNumber() {
    return `AP-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
  }
  
  // Generate a single flight
  function generateFlight(id) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)]
    const flightNumber = Math.floor(Math.random() * 1000)
    const flight = `${airline.code}${flightNumber}`
  
    const originIndex = Math.floor(Math.random() * airports.length)
    let destinationIndex
    do {
      destinationIndex = Math.floor(Math.random() * airports.length)
    } while (destinationIndex === originIndex)
  
    const origin = airports[originIndex]
    const destination = airports[destinationIndex]
  
    const date = getRandomFutureDate()
    const departureTime = getRandomTime()
  
    // Ensure arrival time is after departure time
    let arrivalHours = Number.parseInt(departureTime.split(":")[0])
    const arrivalMinutes = Number.parseInt(departureTime.split(":")[1])
  
    // Add random flight duration (1-12 hours)
    const flightDuration = 1 + Math.floor(Math.random() * 12)
    arrivalHours = (arrivalHours + flightDuration) % 24
    const arrivalTime = `${String(arrivalHours).padStart(2, "0")}:${String(arrivalMinutes).padStart(2, "0")}`
  
    const aircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)]
  
    // Generate random weight and volume within aircraft limits
    const weightUtilizationPercentage = 0.3 + Math.random() * 0.7 // 30-100%
    const volumeUtilizationPercentage = 0.3 + Math.random() * 0.7 // 30-100%
  
    const weight = Math.floor(aircraft.maxWeight * weightUtilizationPercentage)
    const volume = Math.floor(aircraft.maxVolume * volumeUtilizationPercentage)
  
    // Generate random base rate between $1-5 per kg
    const baseRate = 1 + Math.random() * 4
    // Output rate is base rate +/- 20%
    const outputRate = baseRate * (0.8 + Math.random() * 0.4)
  
    return {
      id,
      flight,
      date,
      origin,
      departureTime,
      destination,
      arrivalTime,
      weight,
      volume,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      baseRate: Number.parseFloat(baseRate.toFixed(2)),
      outputRate: Number.parseFloat(outputRate.toFixed(2)),
      tailNumber: getRandomTailNumber(),
      manufacturer: aircraft.manufacturer,
      aircraftType: aircraft.type,
      maxWeight: aircraft.maxWeight,
      maxVolume: aircraft.maxVolume,
    }
  }
  
  // Generate multiple flights
  export function generateFlights(count) {
    const flights = []
    for (let i = 1; i <= count; i++) {
      flights.push(generateFlight(i))
    }
    return flights
  }
  