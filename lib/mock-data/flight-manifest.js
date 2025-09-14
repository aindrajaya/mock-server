// Mock data generators for Flight Manifest APIs

const airlines = ["AL001", "AL002", "AL003"];

const statuses = ["LOADED", "NOT_LOADED", "DAMAGED"];

function generateAWBNumber() {
  const prefix = "020";
  const serial = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}-${serial}`;
}

function generateHAWBNumber() {
  const prefix = "HAWB";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const serial = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${date}-${serial}`;
}

// Generate flight manifest
export function generateFlightManifest(id) {
  const flightNumber = `PK-${Math.floor(Math.random() * 900) + 100}`;

  const flightDate = new Date();
  flightDate.setDate(flightDate.getDate() + Math.floor(Math.random() * 7) + 1);

  const departure = {
    airport: ["KHI", "LHE", "ISB"][Math.floor(Math.random() * 3)],
    scheduledTime: `${flightDate.toISOString().split('T')[0]}T${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00Z`
  };

  const arrival = {
    airport: ["LHR", "FRA", "DXB", "DOH"][Math.floor(Math.random() * 4)],
    scheduledTime: new Date(new Date(departure.scheduledTime).getTime() + (8 + Math.random() * 4) * 60 * 60 * 1000).toISOString()
  };

  const consignments = [];
  const numConsignments = Math.floor(Math.random() * 10) + 5; // 5-15 consignments

  let totalPieces = 0;
  let totalWeight = 0;

  const commodities = ["Electronics", "Textiles", "Machinery", "Chemicals", "Food Products"];

  for (let i = 0; i < numConsignments; i++) {
    const pieces = Math.floor(Math.random() * 20) + 1;
    const weight = Math.floor(Math.random() * 500) + 10;
    const commodity = commodities[Math.floor(Math.random() * commodities.length)];

    consignments.push({
      awbNumber: generateAWBNumber(),
      hawbNumber: generateHAWBNumber(),
      pieces,
      weight: weight + Math.random() * 10, // Add decimal
      commodity,
      uldNumber: `AKE${Math.floor(Math.random() * 90000) + 10000}PK`,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });

    totalPieces += pieces;
    totalWeight += weight;
  }

  return {
    id,
    manifestId: `FFM-${flightNumber.replace('-', '')}-${flightDate.toISOString().slice(0, 10).replace(/-/g, '')}`,
    flightNumber,
    flightDate: flightDate.toISOString().split('T')[0],
    departure,
    arrival,
    consignments,
    totalPieces,
    totalWeight: Number.parseFloat(totalWeight.toFixed(1)),
    status: "SUBMITTED",
    submittedAt: new Date().toISOString(),
    recipients: ["CUSTOMS", "GHA001", "DEST_CUSTOMS"]
  };
}

// Generate multiple flight manifests
export function generateFlightManifests(count) {
  const manifests = [];
  for (let i = 1; i <= count; i++) {
    manifests.push(generateFlightManifest(i));
  }
  return manifests;
}
