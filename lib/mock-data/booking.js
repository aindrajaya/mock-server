// Simple mock generator for booking responses
export function generateBookingResponse(body) {
  // Minimal mapping from request to response
  const now = new Date().toISOString()
  return {
    shipmentReferenceNum: String(Math.floor(Math.random() * 9000000) + 1000000),
    currentBookingStatus: "Queued for Manual Action",
    bookingCaptured: true,
    customerDetails: body.customerDetails || null,
    documentDetails: body.documentDetails || null,
    flightItineraries: body.flightItineraries || [],
    productCommodityDetails: body.productCommodityDetails || null,
    shipmentDimensions: body.shipmentDimensions || [],
    shipmentQuantityDetails: body.shipmentQuantityDetails || null,
    source: body.source || null,
    callBackURL: body.callBackURL || null,
    additionalDetails: body.additionalDetails || null,
    rateDetails: body.rateDetails || null,
    businessErrors: [],
    createdAt: now,
  }
}

export function generateCancellationResponse(body) {
  return {
    documentDetails: body.documentDetails || null,
    cancellationRmks: "Booking cancelled Successfully",
    cancellationStatus: "Cancelled",
  }
}
