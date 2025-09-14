// Mock data generators for Truck Slot Management APIs

const requesters = ["ACA001", "ACA002", "ACA003"];
const ghas = ["GHA001", "GHA002", "GHA003"];

const timePreferences = ["MORNING", "AFTERNOON", "EVENING"];
const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"];
const docks = ["D-01", "D-02", "D-03", "D-04", "D-05", "D-06", "D-07", "D-08"];

function generateVehicleRegistration() {
  const cities = ["KHI", "LHE", "ISB"];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const city = cities[Math.floor(Math.random() * cities.length)];
  const letter1 = letters[Math.floor(Math.random() * letters.length)];
  const letter2 = letters[Math.floor(Math.random() * letters.length)];
  const num1 = numbers[Math.floor(Math.random() * numbers.length)];
  const num2 = numbers[Math.floor(Math.random() * numbers.length)];
  const num3 = numbers[Math.floor(Math.random() * numbers.length)];
  const num4 = numbers[Math.floor(Math.random() * numbers.length)];

  return `${city}-${letter1}${letter2}-${num1}${num2}${num3}${num4}`;
}

// Generate truck slot request
export function generateTruckSlotRequest(id) {
  const requester = requesters[Math.floor(Math.random() * requesters.length)];
  const gha = ghas[Math.floor(Math.random() * ghas.length)];

  const vehicle = {
    registration: generateVehicleRegistration(),
    driverInfo: {
      name: ["Ahmed Ali", "Muhammad Khan", "Hassan Raza", "Ali Hassan"][Math.floor(Math.random() * 4)],
      mobile: `+92${300 + Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 9000000) + 1000000}`
    }
  };

  const requestedDate = new Date();
  requestedDate.setDate(requestedDate.getDate() + Math.floor(Math.random() * 7) + 1);

  const timePreference = timePreferences[Math.floor(Math.random() * timePreferences.length)];

  return {
    id,
    slotId: `SLOT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    requester,
    gha,
    vehicle,
    asiReference: `ASI-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
    requestedSlot: {
      date: requestedDate.toISOString().split('T')[0],
      timePreference
    },
    status: Math.random() > 0.1 ? "CONFIRMED" : "PENDING", // 90% confirmed
    createdAt: new Date().toISOString()
  };
}

// Generate confirmed truck slot response
export function generateTruckSlotResponse(request) {
  if (request.status !== "CONFIRMED") {
    return request;
  }

  const assignedSlot = {
    date: request.requestedSlot.date,
    timeSlot: timeSlots[Math.floor(Math.random() * timeSlots.length)],
    dock: docks[Math.floor(Math.random() * docks.length)]
  };

  const validUntil = new Date(request.requestedSlot.date + 'T' + assignedSlot.timeSlot.split('-')[1] + ':00Z');

  return {
    ...request,
    assignedSlot,
    vehicle: {
      ...request.vehicle,
      token: `TKN-${request.vehicle.registration.replace('-', '')}-${request.requestedSlot.date.replace(/-/g, '')}`
    },
    qrCode: `https://acs.airport.pk/qr/TKN-${request.vehicle.registration.replace('-', '')}-${request.requestedSlot.date.replace(/-/g, '')}`,
    validUntil: validUntil.toISOString(),
    confirmedAt: new Date().toISOString()
  };
}

// Generate multiple truck slot requests
export function generateTruckSlotRequests(count) {
  const requests = [];
  for (let i = 1; i <= count; i++) {
    const request = generateTruckSlotRequest(i);
    requests.push(generateTruckSlotResponse(request));
  }
  return requests;
}
