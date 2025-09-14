// Mock data generators for Advanced Shipment Information (ASI) APIs

const stakeholders = ["GHA001", "CUSTOMS", "AL001", "ACA001", "CONS001"];

const shippers = [
  { name: "ABC Trading Co", address: "123 Business St, Karachi" },
  { name: "Global Imports Ltd", address: "456 Commerce Ave, London" },
  { name: "Pacific Traders Inc", address: "789 Trade Blvd, Singapore" }
];

const consignees = [
  { name: "XYZ Imports Ltd", address: "456 Commerce Ave, London" },
  { name: "European Distributors GmbH", address: "321 Industrial Str, Berlin" },
  { name: "Asian Markets Corp", address: "654 Market Rd, Tokyo" }
];

const agents = ["ACA001", "ACA002", "ACA003"];

const commodities = ["Electronics", "Textiles", "Machinery", "Chemicals", "Food Products"];

function generateAWBNumber() {
  const prefix = "020";
  const serial = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}-${serial}`;
}

// Generate ASI
export function generateASI(id) {
  const awbNumber = generateAWBNumber();
  const sender = agents[Math.floor(Math.random() * agents.length)];
  const recipients = stakeholders.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);

  const shipper = shippers[Math.floor(Math.random() * shippers.length)];
  const consignee = consignees[Math.floor(Math.random() * consignees.length)];
  const agent = sender;

  const flightDate = new Date();
  flightDate.setDate(flightDate.getDate() + Math.floor(Math.random() * 14) + 1);

  const pieces = Math.floor(Math.random() * 20) + 1;
  const weight = Math.floor(Math.random() * 500) + 10;
  const commodity = commodities[Math.floor(Math.random() * commodities.length)];

  const dimensions = {
    length: Math.floor(Math.random() * 200) + 20,
    width: Math.floor(Math.random() * 150) + 20,
    height: Math.floor(Math.random() * 150) + 20
  };

  return {
    id,
    asiId: `ASI-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    awbNumber,
    sender,
    recipients,
    shipmentDetails: {
      departure: {
        airport: ["KHI", "LHE", "ISB"][Math.floor(Math.random() * 3)],
        date: flightDate.toISOString().split('T')[0]
      },
      destination: {
        airport: ["LHR", "FRA", "DXB", "DOH"][Math.floor(Math.random() * 4)]
      },
      shipper,
      consignee,
      agent,
      flightNumber: `PK-${Math.floor(Math.random() * 900) + 100}`,
      pieces,
      weight: weight + Math.random() * 10, // Add decimal
      dimensions,
      commodity
    },
    sentAt: new Date().toISOString(),
    status: "SENT",
    deliveryStatus: recipients.reduce((acc, recipient) => {
      acc[recipient] = "DELIVERED";
      return acc;
    }, {})
  };
}

// Generate multiple ASI records
export function generateASIs(count) {
  const asis = [];
  for (let i = 1; i <= count; i++) {
    asis.push(generateASI(i));
  }
  return asis;
}
