// Mock generator for shipments (FWB capture and tracking)
export function generateFwbCaptureResponse(body) {
  return {
    airwaybillStatusDetails: {
      requestTimeUTC: new Date().toISOString(),
      airwaybillStatus: { status: 'Success', statusDescription: 'FWB Captured Successfully' }
    }
  }
}

export function generateTrackingResponse(body) {
  const now = new Date().toISOString()
  return {
    cargoTrackingSOs: [
      {
        docType: 'MAWB',
        docPrefix: body.awbPrefix || '157',
        docNumber: body.awbNumber || '10000000',
        snrNumber: String(Math.floor(Math.random() * 9000000) + 1000000),
        volumeUnit: 'MC',
        agentCode: '',
        agentName: '',
        depPcs: 0,
        origin: body.origin || 'FRA',
        destination: body.destination || 'PEK',
        pieces: 1,
        weight: 55,
        volume: 0.312,
        shipmentInfo: `MAWB ${body.awbPrefix || '157'}-${body.awbNumber || '10000000'}`,
        cargoTrackingFlightList: [],
        cargoTrackingMvtStausList: [{ movementDetails: `Manifested On ${now}` }],
        trackingAptMvtStausSOs: []
      }
    ]
  }
}
