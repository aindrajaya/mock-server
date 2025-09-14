// Mock data generators for Payment Gateway APIs

const payers = ["CONS001", "ACA001", "GHA001"];
const payees = ["ACA001", "GHA001", "AL001"];

const paymentTypes = ["CARGO_CHARGES", "HANDLING_FEES", "CUSTOMS_DUTIES", "STORAGE_FEES"];
const paymentMethods = ["CREDIT_CARD", "BANK_TRANSFER", "CASH", "DIGITAL_WALLET"];

const currencies = ["USD", "EUR", "GBP", "PKR"];

const transactionStatuses = ["COMPLETED", "PENDING", "FAILED", "REFUNDED"];

// Generate payment
export function generatePayment(id) {
  const payer = payers[Math.floor(Math.random() * payers.length)];
  let payee;
  do {
    payee = payees[Math.floor(Math.random() * payees.length)];
  } while (payee === payer);

  const amount = {
    value: Math.floor(Math.random() * 10000) + 100, // $100-10100
    currency: currencies[Math.floor(Math.random() * currencies.length)]
  };

  const paymentType = paymentTypes[Math.floor(Math.random() * paymentTypes.length)];
  const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

  const reference = {
    type: ["BOOKING", "INVOICE", "SERVICE"][Math.floor(Math.random() * 3)],
    id: `${reference.type.charAt(0)}${reference.type.slice(1).toLowerCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  };

  const status = transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)];

  const processedAt = new Date();
  processedAt.setDate(processedAt.getDate() - Math.floor(Math.random() * 30)); // Up to 30 days ago

  return {
    id,
    paymentId: `PAY-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(id).padStart(3, '0')}`,
    payer,
    payee,
    amount,
    paymentType,
    reference,
    paymentMethod,
    status,
    transactionId: `TXN-${paymentMethod.charAt(0)}${paymentMethod.slice(1).toLowerCase().replace('_', '')}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    processedAt: processedAt.toISOString()
  };
}

// Generate multiple payments
export function generatePayments(count) {
  const payments = [];
  for (let i = 1; i <= count; i++) {
    payments.push(generatePayment(i));
  }
  return payments;
}
