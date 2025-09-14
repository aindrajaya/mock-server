// Mock data generators for PLACI (Pre-Loading Advance Cargo Information) APIs

const airlines = ["AL001", "AL002", "AL003"];

const riskLevels = ["GREEN", "YELLOW", "RED"];
const decisions = ["LOAD", "HOLD", "REJECT"];
const instructions = [
  "Proceed with loading",
  "Additional screening required",
  "Documentation verification needed",
  "Customs clearance pending"
];

function generateHAWBNumber() {
  const prefix = "HAWB";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const serial = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${date}-${serial}`;
}

// Generate PLACI submission
export function generatePLACI(id) {
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  const flightNumber = `PK-${Math.floor(Math.random() * 900) + 100}`;

  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 7) + 1);

  const consignors = [
    { name: "ABC Trading Co", address: "123 Business St, Karachi" },
    { name: "Global Imports Ltd", address: "456 Commerce Ave, London" }
  ];

  const consignees = [
    { name: "XYZ Imports Ltd", address: "456 Commerce Ave, London" },
    { name: "European Distributors GmbH", address: "321 Industrial Str, Berlin" }
  ];

  const commodities = ["Electronic Equipment", "Textile Products", "Machinery Parts", "Chemical Supplies"];

  const consignments = [];
  const numConsignments = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numConsignments; i++) {
    consignments.push({
      hawbNumber: generateHAWBNumber(),
      consignor: consignors[Math.floor(Math.random() * consignors.length)],
      consignee: consignees[Math.floor(Math.random() * consignees.length)],
      packages: Math.floor(Math.random() * 20) + 1,
      totalGrossWeight: {
        amount: Math.floor(Math.random() * 500) + 10,
        unit: "kg"
      },
      cargoDescription: commodities[Math.floor(Math.random() * commodities.length)],
      dataFiler: ["ACA001", "ACA002", "ACA003"][Math.floor(Math.random() * 3)]
    });
  }

  return {
    id,
    placiId: `PLACI-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    airline,
    flightNumber,
    departureDate: departureDate.toISOString().split('T')[0],
    status: "SUBMITTED",
    submittedAt: new Date().toISOString(),
    consignments: consignments.map(consignment => ({
      ...consignment,
      riskAssessment: "PENDING",
      status: "UNDER_REVIEW"
    })),
    expectedResponse: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours later
  };
}

// Generate PLACI risk assessment
export function generatePLACIRiskAssessment(placiId) {
  const assessmentResults = [];

  // Mock some consignments with different risk levels
  const numConsignments = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numConsignments; i++) {
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    let decision, instruction;

    switch (riskLevel) {
      case "GREEN":
        decision = "LOAD";
        instruction = "Proceed with loading";
        break;
      case "YELLOW":
        decision = Math.random() > 0.5 ? "LOAD" : "HOLD";
        instruction = Math.random() > 0.5 ? "Additional screening required" : "Documentation verification needed";
        break;
      case "RED":
        decision = "REJECT";
        instruction = "Customs clearance pending";
        break;
    }

    assessmentResults.push({
      hawbNumber: generateHAWBNumber(),
      riskLevel,
      decision,
      instructions: instruction,
      assessedAt: new Date().toISOString()
    });
  }

  const overallStatus = assessmentResults.every(result => result.decision === "LOAD") ? "CLEARED_FOR_LOADING" :
                       assessmentResults.some(result => result.decision === "REJECT") ? "REJECTED" :
                       "PARTIAL_CLEARANCE";

  return {
    placiId,
    flightNumber: `PK-${Math.floor(Math.random() * 900) + 100}`,
    assessmentResults,
    overallStatus
  };
}

// Generate multiple PLACI submissions
export function generatePLACIs(count) {
  const placis = [];
  for (let i = 1; i <= count; i++) {
    placis.push(generatePLACI(i));
  }
  return placis;
}
