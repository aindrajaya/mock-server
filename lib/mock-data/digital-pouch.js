// Mock data generators for Digital Pouch APIs

const creators = ["GHA001", "ACA001", "AL001"];

const documentTypes = ["MAWB", "HAWB", "PACKING_LIST", "INVOICE", "CERTIFICATE_OF_ORIGIN", "INSURANCE_CERTIFICATE"];

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

function generateChecksum() {
  return `sha256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
}

// Generate digital pouch
export function generateDigitalPouch(id) {
  const creator = creators[Math.floor(Math.random() * creators.length)];
  const awbNumber = generateAWBNumber();
  const hawbNumber = generateHAWBNumber();

  const numDocuments = Math.floor(Math.random() * 4) + 2; // 2-6 documents
  const selectedDocTypes = documentTypes.sort(() => 0.5 - Math.random()).slice(0, numDocuments);

  const documents = selectedDocTypes.map((docType, index) => ({
    type: docType,
    filename: `${docType.toLowerCase().replace('_', '-')}-${awbNumber}.pdf`,
    content: `base64_encoded_content_for_${docType.toLowerCase()}_${index}`,
    checksum: generateChecksum()
  }));

  const sharedWith = ["AL001", "ACA001", "CONS001", "CUSTOMS"].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);

  return {
    id,
    pouchId: `POUCH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    awbNumber,
    hawbNumber,
    creator,
    status: "CREATED",
    documentCount: documents.length,
    documents,
    createdAt: new Date().toISOString(),
    accessUrl: `https://acs.airport.pk/pouch/POUCH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    sharedWith,
    lastAccessed: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString() : null
  };
}

// Generate multiple digital pouches
export function generateDigitalPouches(count) {
  const pouches = [];
  for (let i = 1; i <= count; i++) {
    pouches.push(generateDigitalPouch(i));
  }
  return pouches;
}
