// Mock data generators for AWB Stock Management

// Generate AWB stock request
export function generateAWBStockRequest(id) {
  const requestingParties = ["ACA001", "ACA002", "ACA003", "ACA004"];
  const airlines = ["AL001", "AL002", "AL003"];
  const priorities = ["HIGH", "MEDIUM", "LOW"];

  const requestingParty = requestingParties[Math.floor(Math.random() * requestingParties.length)];
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  const quantity = Math.floor(Math.random() * 500) + 50; // 50-550
  const priority = priorities[Math.floor(Math.random() * priorities.length)];

  return {
    id,
    requestId: `REQ-AWB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    requestingParty,
    airline,
    quantity,
    priority,
    requestDate: new Date().toISOString(),
    status: "PENDING",
    estimatedProcessingTime: `${Math.floor(Math.random() * 48) + 1} hours`
  };
}

// Generate AWB stock reply
export function generateAWBStockReply(requestId) {
  const statuses = ["APPROVED", "REJECTED", "PARTIAL"];
  const deliveryMethods = ["DIGITAL", "PHYSICAL", "EMAIL"];

  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const approvedQuantity = status === "APPROVED" ? 100 : status === "PARTIAL" ? Math.floor(Math.random() * 80) + 20 : 0;
  const deliveryMethod = deliveryMethods[Math.floor(Math.random() * deliveryMethods.length)];

  const startNumber = Math.floor(Math.random() * 90000000) + 10000000; // 8-digit number
  const endNumber = startNumber + approvedQuantity - 1;

  return {
    requestId,
    status,
    approvedQuantity,
    awbRange: status !== "REJECTED" ? {
      startNumber: `020-${String(startNumber).padStart(8, '0')}`,
      endNumber: `020-${String(endNumber).padStart(8, '0')}`
    } : null,
    deliveryMethod,
    processedDate: new Date().toISOString(),
    notes: status === "APPROVED" ? "Stock approved for immediate use" :
           status === "PARTIAL" ? "Partial approval due to limited stock" :
           "Request rejected due to policy restrictions"
  };
}

// Generate multiple AWB stock requests
export function generateAWBStockRequests(count) {
  const requests = [];
  for (let i = 1; i <= count; i++) {
    requests.push(generateAWBStockRequest(i));
  }
  return requests;
}
