// Mock data generators for HAWB/MAWB Management APIs

const acas = ["ACA001", "ACA002", "ACA003"];

const consignors = [
  {
    name: "ABC Trading Co",
    address: "123 Business St, Karachi",
    contact: "+92-21-1234567"
  },
  {
    name: "Global Imports Ltd",
    address: "456 Commerce Ave, London",
    contact: "+44-20-7890123"
  },
  {
    name: "Pacific Traders Inc",
    address: "789 Trade Blvd, Singapore",
    contact: "+65-67890123"
  }
];

const consignees = [
  {
    name: "XYZ Imports Ltd",
    address: "456 Commerce Ave, London",
    contact: "+44-20-7890123"
  },
  {
    name: "European Distributors GmbH",
    address: "321 Industrial Str, Berlin",
    contact: "+49-30-1234567"
  },
  {
    name: "Asian Markets Corp",
    address: "654 Market Rd, Tokyo",
    contact: "+81-3-1234567"
  }
];

const commodities = ["Electronics", "Textiles", "Machinery", "Chemicals", "Food Products"];

const currencies = ["USD", "EUR", "GBP"];

function generateHAWBNumber() {
  const prefix = "HAWB";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const serial = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${date}-${serial}`;
}

// Generate HAWB
export function generateHAWB(id) {
  const aca = acas[Math.floor(Math.random() * acas.length)];
  const consignor = consignors[Math.floor(Math.random() * consignors.length)];
  const consignee = consignees[Math.floor(Math.random() * consignees.length)];

  const pieces = Math.floor(Math.random() * 20) + 1;
  const weight = Math.floor(Math.random() * 500) + 10;
  const commodity = commodities[Math.floor(Math.random() * commodities.length)];

  const dimensions = {
    length: Math.floor(Math.random() * 200) + 20,
    width: Math.floor(Math.random() * 150) + 20,
    height: Math.floor(Math.random() * 150) + 20
  };

  const value = {
    amount: Math.floor(Math.random() * 100000) + 1000,
    currency: currencies[Math.floor(Math.random() * currencies.length)]
  };

  const routing = {
    origin: ["KHI", "LHE", "ISB"][Math.floor(Math.random() * 3)],
    destination: ["LHR", "FRA", "DXB", "DOH"][Math.floor(Math.random() * 4)]
  };

  return {
    id,
    hawbNumber: generateHAWBNumber(),
    aca,
    consignor,
    consignee,
    shipment: {
      pieces,
      weight: weight + Math.random() * 10, // Add decimal
      dimensions,
      commodity,
      value
    },
    routing,
    status: Math.random() > 0.5 ? "DRAFT" : "APPROVED",
    createdAt: new Date().toISOString(),
    requiresConsignorApproval: Math.random() > 0.7
  };
}

// Generate multiple HAWBs
export function generateHAWBs(count) {
  const hawbs = [];
  for (let i = 1; i <= count; i++) {
    hawbs.push(generateHAWB(i));
  }
  return hawbs;
}
