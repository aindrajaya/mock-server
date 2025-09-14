// Mock data generators for Status Update APIs

const senders = ["GHA001", "ACA001", "AL001", "CUSTOMS"];

const statusCodes = [
  "BKD", "RCS", "NFD", "AWD", "CCD", "DEP", "ARR", "RCF", "DLV", "DDL"
];

const statusDescriptions = [
  "Booked", "Ready for Carriage", "Notified for Delivery", "Arrived at Warehouse",
  "Cleared by Customs", "Departed", "Arrived", "Received from Flight",
  "Delivered", "Delivery Delayed"
];

const locations = [
  { airport: "KHI", terminal: "T1" },
  { airport: "LHE", terminal: "T2" },
  { airport: "ISB", terminal: "T3" },
  { airport: "LHR", terminal: "T4" },
  { airport: "FRA", terminal: "T5" }
];

function generateAWBNumber() {
  const prefix = "020";
  const serial = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}-${serial}`;
}

// Generate status update (FSU message)
export function generateStatusUpdate(id) {
  const sender = senders[Math.floor(Math.random() * senders.length)];
  const awbNumber = generateAWBNumber();

  const statusIndex = Math.floor(Math.random() * statusCodes.length);
  const statusCode = statusCodes[statusIndex];
  const statusDescription = statusDescriptions[statusIndex];

  const location = locations[Math.floor(Math.random() * locations.length)];

  const flightNumber = `PK-${Math.floor(Math.random() * 900) + 100}`;

  const statusDate = new Date();
  statusDate.setDate(statusDate.getDate() - Math.floor(Math.random() * 7)); // Up to 7 days ago

  const pieces = Math.floor(Math.random() * 20) + 1;
  const weight = Math.floor(Math.random() * 500) + 10;

  const remarks = [
    "Cargo ready for loading",
    "Shipment arrived at destination",
    "Customs clearance completed",
    "Delivery scheduled for tomorrow",
    "Additional documentation required",
    "Temperature controlled shipment"
  ][Math.floor(Math.random() * 6)];

  const recipients = ["ACA001", "AL001", "CONS001"];
  if (sender !== "ACA001") recipients.push("ACA001");
  if (sender !== "AL001") recipients.push("AL001");
  if (sender !== "CONS001") recipients.push("CONS001");

  return {
    id,
    statusId: `FSU-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    sender,
    awbNumber,
    statusCode,
    statusDescription,
    location,
    flightNumber,
    statusDate: statusDate.toISOString(),
    pieces,
    weight: weight + Math.random() * 10, // Add decimal
    remarks,
    recipients: [...new Set(recipients)], // Remove duplicates
    delivered: true,
    deliveredAt: new Date(statusDate.getTime() + Math.floor(Math.random() * 60 * 60 * 1000)).toISOString() // Within 1 hour
  };
}

// Generate multiple status updates
export function generateStatusUpdates(count) {
  const updates = [];
  for (let i = 1; i <= count; i++) {
    updates.push(generateStatusUpdate(i));
  }
  return updates;
}
