// Mock data generators for Quotation and Booking APIs

const consignors = [
  { id: "CONS001", name: "ABC Trading Co" },
  { id: "CONS002", name: "Global Imports Ltd" },
  { id: "CONS003", name: "Pacific Traders Inc" },
  { id: "CONS004", name: "Euro Cargo GmbH" }
];

const acas = [
  { id: "ACA001", name: "Express Cargo Services" },
  { id: "ACA002", name: "Swift Logistics" },
  { id: "ACA003", name: "Fast Track Cargo" }
];

const commodities = ["Electronics", "Textiles", "Machinery", "Chemicals", "Food Products", "Automotive Parts"];

const shippingTerms = ["CIF", "FOB", "DDP", "DAP"];

const currencies = ["USD", "EUR", "GBP", "PKR"];

// Generate quote request
export function generateQuoteRequest(id) {
  const consignor = consignors[Math.floor(Math.random() * consignors.length)];
  const origin = ["KHI", "LHE", "ISB"][Math.floor(Math.random() * 3)];
  const destination = ["LHR", "FRA", "DXB", "DOH", "IST"][Math.floor(Math.random() * 5)];
  const pieces = Math.floor(Math.random() * 20) + 1;
  const weight = Math.floor(Math.random() * 500) + 10;
  const commodity = commodities[Math.floor(Math.random() * commodities.length)];
  const shippingTerm = shippingTerms[Math.floor(Math.random() * shippingTerms.length)];

  const dimensions = {
    length: Math.floor(Math.random() * 200) + 20,
    width: Math.floor(Math.random() * 150) + 20,
    height: Math.floor(Math.random() * 150) + 20,
    unit: "cm"
  };

  const pickupDate = new Date();
  pickupDate.setDate(pickupDate.getDate() + Math.floor(Math.random() * 14) + 1);

  return {
    id,
    quoteId: `QUO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    consignor,
    aca: acas[Math.floor(Math.random() * acas.length)],
    shipment: {
      origin,
      destination,
      pieces,
      weight: weight + Math.random() * 10, // Add decimal
      dimensions,
      commodity,
      stackable: Math.random() > 0.5,
      pickupDate: pickupDate.toISOString()
    },
    shippingTerms: shippingTerm,
    createdAt: new Date().toISOString()
  };
}

// Generate quote response with pricing
export function generateQuoteResponse(quoteRequest) {
  const airFreightRate = 2 + Math.random() * 6; // $2-8 per kg
  const airFreightCharge = quoteRequest.shipment.weight * airFreightRate;
  const otherCharges = Math.floor(Math.random() * 200) + 50;
  const totalAmount = airFreightCharge + otherCharges;
  const currency = currencies[Math.floor(Math.random() * currencies.length)];

  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + 7); // Valid for 7 days

  // Generate flight options
  const flightOptions = [];
  for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
    const flightDate = new Date();
    flightDate.setDate(flightDate.getDate() + Math.floor(Math.random() * 10) + 3);

    flightOptions.push({
      flightNumber: `PK-${Math.floor(Math.random() * 900) + 100}`,
      date: flightDate.toISOString().split('T')[0],
      capacity: Math.random() > 0.8 ? "FULL" : "AVAILABLE"
    });
  }

  return {
    ...quoteRequest,
    pricing: {
      airFreightRate: Number.parseFloat(airFreightRate.toFixed(2)),
      airFreightCharge: Number.parseFloat(airFreightCharge.toFixed(2)),
      otherCharges: Number.parseFloat(otherCharges.toFixed(2)),
      totalAmount: Number.parseFloat(totalAmount.toFixed(2)),
      currency
    },
    validity: validityDate.toISOString(),
    flightOptions,
    status: "ACTIVE"
  };
}

// Generate booking
export function generateBooking(id, quoteId) {
  const awbNumber = `020-${Math.floor(Math.random() * 90000000 + 10000000)}`;
  const flightDate = new Date();
  flightDate.setDate(flightDate.getDate() + Math.floor(Math.random() * 14) + 1);

  return {
    id,
    bookingId: `BKG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    quoteId,
    awbNumber,
    status: "CONFIRMED",
    flightDetails: {
      flightNumber: `PK-${Math.floor(Math.random() * 900) + 100}`,
      date: flightDate.toISOString().split('T')[0],
      departureTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00Z`
    },
    shipment: {
      origin: ["KHI", "LHE", "ISB"][Math.floor(Math.random() * 3)],
      destination: ["LHR", "FRA", "DXB"][Math.floor(Math.random() * 3)],
      pieces: Math.floor(Math.random() * 20) + 1,
      weight: Math.floor(Math.random() * 500) + 10,
      commodity: commodities[Math.floor(Math.random() * commodities.length)]
    },
    validUntil: new Date(flightDate.getTime() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours validity
    createdAt: new Date().toISOString()
  };
}

// Generate multiple quotes
export function generateQuoteRequests(count) {
  const quotes = [];
  for (let i = 1; i <= count; i++) {
    const request = generateQuoteRequest(i);
    quotes.push(generateQuoteResponse(request));
  }
  return quotes;
}

// Generate multiple bookings
export function generateBookings(count) {
  const bookings = [];
  for (let i = 1; i <= count; i++) {
    bookings.push(generateBooking(i, `QUO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`));
  }
  return bookings;
}
