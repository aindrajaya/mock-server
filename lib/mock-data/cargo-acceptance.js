// Mock data generators for Cargo Acceptance APIs

const ghas = ["GHA001", "GHA002", "GHA003"];

const packingStatuses = ["GOOD", "DAMAGED", "ACCEPTABLE"];
const toleranceStatuses = ["WITHIN_LIMITS", "OVER_LIMIT", "UNDER_LIMIT"];

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

// Generate cargo acceptance
export function generateCargoAcceptance(id) {
  const gha = ghas[Math.floor(Math.random() * ghas.length)];
  const awbNumber = generateAWBNumber();
  const hawbNumber = generateHAWBNumber();

  const expectedPieces = Math.floor(Math.random() * 20) + 1;
  const receivedPieces = Math.random() > 0.9 ? expectedPieces - 1 : expectedPieces; // 90% match

  const expectedWeight = Math.floor(Math.random() * 500) + 10;
  const actualWeight = expectedWeight + (Math.random() - 0.5) * 10; // +/- 5kg variation

  const expectedDimensions = {
    length: Math.floor(Math.random() * 200) + 20,
    width: Math.floor(Math.random() * 150) + 20,
    height: Math.floor(Math.random() * 150) + 20
  };

  const measuredDimensions = {
    length: expectedDimensions.length + Math.floor((Math.random() - 0.5) * 10),
    width: expectedDimensions.width + Math.floor((Math.random() - 0.5) * 10),
    height: expectedDimensions.height + Math.floor((Math.random() - 0.5) * 10)
  };

  const weightTolerance = Math.abs(actualWeight - expectedWeight) < 5 ? "WITHIN_LIMITS" : "OVER_LIMIT";
  const dimensionStatus = Math.random() > 0.8 ? "ACCEPTABLE" : "ACCEPTABLE"; // Most are acceptable

  const commodities = ["Electronics", "Textiles", "Machinery", "Chemicals", "Food Products"];
  const commodity = commodities[Math.floor(Math.random() * commodities.length)];

  const packingStatus = packingStatuses[Math.floor(Math.random() * packingStatuses.length)];

  const irregularities = [];
  if (receivedPieces !== expectedPieces) {
    irregularities.push("Piece count mismatch");
  }
  if (weightTolerance === "OVER_LIMIT") {
    irregularities.push("Weight over tolerance");
  }
  if (packingStatus === "DAMAGED") {
    irregularities.push("Damaged packaging");
  }

  const acceptedAt = new Date();
  acceptedAt.setDate(acceptedAt.getDate() - Math.floor(Math.random() * 7)); // Up to 7 days ago

  return {
    id,
    acceptanceId: `ACC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    gha,
    awbNumber,
    hawbNumber,
    acceptance: {
      pieces: {
        expected: expectedPieces,
        received: receivedPieces,
        status: receivedPieces === expectedPieces ? "MATCH" : "MISMATCH"
      },
      weight: {
        expected: Number.parseFloat(expectedWeight.toFixed(1)),
        actual: Number.parseFloat(actualWeight.toFixed(1)),
        tolerance: weightTolerance
      },
      dimensions: {
        measured: measuredDimensions,
        status: dimensionStatus
      },
      commodity,
      packingStatus,
      irregularities
    },
    acceptedAt: acceptedAt.toISOString(),
    status: irregularities.length === 0 ? "ACCEPTED" : "ACCEPTED_WITH_IRREGULARITIES",
    notifications: {
      sent: ["ACA001", "AL001", "CUSTOMS", "CONS001"]
    }
  };
}

// Generate multiple cargo acceptances
export function generateCargoAcceptances(count) {
  const acceptances = [];
  for (let i = 1; i <= count; i++) {
    acceptances.push(generateCargoAcceptance(i));
  }
  return acceptances;
}
