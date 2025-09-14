export function generateStockResponse(body) {
  return {
    errorResponseSO: null,
    prefix: '157',
    docNumber: String(Math.floor(Math.random() * 90000000) + 10000000)
  }
}
