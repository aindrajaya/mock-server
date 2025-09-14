// Mock data generators for Dangerous Goods Declaration APIs

const consignors = [
  { name: "Chemical Industries Ltd", address: "789 Industrial Ave, Karachi" },
  { name: "Lab Supplies Co", address: "321 Science Park, London" },
  { name: "Pharma Corp", address: "654 Medical Blvd, Singapore" }
];

const consignees = [
  { name: "Lab Supplies Co", address: "321 Science Park, London" },
  { name: "Research Institute", address: "987 Science Rd, Berlin" },
  { name: "Medical Center", address: "147 Health St, Tokyo" }
];

const unNumbers = ["UN1230", "UN1993", "UN1202", "UN1219", "UN1223"];
const properShippingNames = ["Methanol", "Flammable liquids, n.o.s.", "Gasoline", "Isopropanol", "Kerosene"];
const classOrDivisions = ["3", "2.1", "2.2", "4.1", "5.1"];
const packingGroups = ["I", "II", "III"];

const packingTypes = ["Drum", "Jerrycan", "IBC", "Cylinder"];
const packingInstructions = ["P001", "P002", "P003", "P004"];

function generateAWBNumber() {
  const prefix = "020";
  const serial = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}-${serial}`;
}

// Generate dangerous goods declaration
export function generateDangerousGoodsDeclaration(id) {
  const consignor = consignors[Math.floor(Math.random() * consignors.length)];
  const consignee = consignees[Math.floor(Math.random() * consignees.length)];
  const awbNumber = generateAWBNumber();

  const dgIndex = Math.floor(Math.random() * unNumbers.length);

  const quantity = {
    amount: Math.floor(Math.random() * 100) + 1,
    unit: ["L", "kg", "m³"][Math.floor(Math.random() * 3)]
  };

  const flightDate = new Date();
  flightDate.setDate(flightDate.getDate() + Math.floor(Math.random() * 14) + 1);

  return {
    id,
    dgdId: `DGD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    consignor,
    consignee,
    awbNumber,
    transportDetails: {
      flightNumber: `PK-${Math.floor(Math.random() * 900) + 100}`,
      date: flightDate.toISOString().split('T')[0]
    },
    dangerousGoods: {
      unNumber: unNumbers[dgIndex],
      properShippingName: properShippingNames[dgIndex],
      classOrDivision: classOrDivisions[dgIndex],
      packingGroup: packingGroups[Math.floor(Math.random() * packingGroups.length)],
      quantity,
      packingType: packingTypes[Math.floor(Math.random() * packingTypes.length)],
      packingInstructions: packingInstructions[Math.floor(Math.random() * packingInstructions.length)]
    },
    authorization: {
      issued: Math.random() > 0.3, // 70% have authorization
      number: Math.random() > 0.3 ? `DG-AUTH-${Math.floor(Math.random() * 1000)}` : null
    },
    status: "SUBMITTED",
    submittedAt: new Date().toISOString(),
    requiresGHAApproval: Math.random() > 0.5,
    requiresAirlineApproval: Math.random() > 0.5
  };
}

// Generate multiple dangerous goods declarations
export function generateDangerousGoodsDeclarations(count) {
  const declarations = [];
  for (let i = 1; i <= count; i++) {
    declarations.push(generateDangerousGoodsDeclaration(i));
  }
  return declarations;
}
