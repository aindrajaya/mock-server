# Mock Server — Availability & Booking APIs

This repository provides simple mock implementations for Availability and Booking Experience APIs.

## Available endpoints

- `GET /api/status` — health check
- `POST /api/availability` — availability & rate search (mocked)
- `POST /api/booking` — create booking (mocked)
- `DELETE /api/booking` — cancel booking (mocked)

## Run locally

1. Install dependencies (if not already):

```bash
npm install
```

2. Start the Next.js dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000` by default.

## Examples

Use curl, httpie, Postman, or your preferred HTTP client.

1) Health check

Request:

```bash
curl http://localhost:3000/api/status
```

Response (example):

```json
{
  "success": true,
  "apiName": "Availability-v1-mocking",
  "version": "1.0",
  "timestamp": "2025-09-14T12:00:00.000Z"
}
```

2) Availability search

Endpoint: `POST /api/availability`

Request body (inline JSON):

JSON body:

```json
{
  "origin": "CDG",
  "destination": "BOM",
  "routingPreference": { "scheduledDepartureDate": "2025-09-20" }
}
```

Response (example):

```json
{
  "availabilityResponseSOs": [
    {
      "id": 1,
      "carrier": "QR",
      "flightNumber": "QR123",
      "origin": "CDG",
      "destination": "BOM",
      "departureDate": "2025-09-20",
      "availablePieces": 5,
      "availableWeight": 1200,
      "rate": { "currencyCode": "USD", "ratePerKilo": 3.5, "chargeableWeight": 100, "totalAmount": 350 }
    }
  ],
  "pagination": { "total": 1, "page": 1, "limit": 1 }
}
```

3) Create booking

Endpoint: `POST /api/booking`

Minimal required fields (inferred from spec): `customerDetails`, `documentDetails`, `productCommodityDetails`, `shipmentQuantityDetails`, `requestRefId`, `requestType`, `flightItineraries`.

Request example (inline JSON):

JSON body:

```json
{
  "customerDetails": { "agentCassCode": "7515", "agentIataCode": "2045131" },
  "documentDetails": { "airWaybillIssuePlace": "PAR", "airWaybillNumber": "1234567", "airWaybillorigin": "PAR", "airWaybilldestination": "MCT", "airlinePrefix": 157, "documentType": "MAWB", "airWaybillCurrency": "EUR" },
  "productCommodityDetails": { "productCode": "GCR", "commodityCode": "9999" },
  "shipmentQuantityDetails": { "chargeableWeight": 30, "chargeableWeightUnit": "Kg", "totalPieces": 1, "totalVolume": 0.064, "totalWeight": 30, "volumeUnit": "MC", "weightUnit": "Kg" },
  "requestRefId": "1550677",
  "requestType": "1",
  "flightItineraries": [ { "carrierCode": "QR", "carrierNumber": "3500", "scheduledDepartureDate": "2025-09-20", "segmentOfDeparture": "PAR", "segmentOfArrival": "DOH" } ]
}
```

Response (example):

```json
{
  "shipmentReferenceNum": "2630058",
  "currentBookingStatus": "Queued for Manual Action",
  "bookingCaptured": true,
  "customerDetails": { /* echoed */ },
  "documentDetails": { /* echoed */ },
  "flightItineraries": [ /* echoed */ ],
  "createdAt": "2025-09-14T12:00:00.000Z"
}
```

4) Cancel booking

Endpoint: `DELETE /api/booking`

Request body must include at least `shipmentReferenceNum` or `documentDetails`.

JSON body:

```json
{ "shipmentReferenceNum": "2630058" }
```

Response (example):

```json
{
  "documentDetails": null,
  "cancellationRmks": "Booking cancelled Successfully",
  "cancellationStatus": "Cancelled"
}
```

## Notes & next steps

- The mock endpoints implement minimal validation. If you need strict OpenAPI schema validation, I can add `ajv` and wire the `booking-api.json` / `openapi` schema to validate requests and return structured errors.
- If you want the OpenAPI specs served or a Swagger UI, I can add a static route or integrate `swagger-ui-express` for local testing.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to test the APIs (exact commands)

1) Start the dev server (PowerShell):

```powershell
npm install; npm run dev
```

By default the mock server runs at http://localhost:3000

2) Health check (GET)

curl (PowerShell / cmd):

```powershell
curl http://localhost:3000/api/status
```

3) Availability search (POST)

Minimal request body (save as availability.json):

```json
{
  "origin": "CDG",
  "destination": "BOM",
  "routingPreference": { "scheduledDepartureDate": "2025-09-20" }
}
```

curl (PowerShell):

```powershell
curl -X POST http://localhost:3000/api/availability -H "Content-Type: application/json" -d (Get-Content -Raw .\availability.json)
```

4) Create booking (POST)

Minimal request body (save as booking.json):

```json
{
  "customerDetails": { "agentCassCode": "7515", "agentIataCode": "2045131" },
  "documentDetails": { "airWaybillIssuePlace": "PAR", "airWaybillNumber": "1234567", "airWaybillorigin": "PAR", "airWaybilldestination": "MCT", "airlinePrefix": 157, "documentType": "MAWB", "airWaybillCurrency": "EUR" },
  "productCommodityDetails": { "productCode": "GCR", "commodityCode": "9999" },
  "shipmentQuantityDetails": { "chargeableWeight": 30, "chargeableWeightUnit": "Kg", "totalPieces": 1, "totalVolume": 0.064, "totalWeight": 30, "volumeUnit": "MC", "weightUnit": "Kg" },
  "requestRefId": "1550677",
  "requestType": "1",
  "flightItineraries": [ { "carrierCode": "QR", "carrierNumber": "3500", "scheduledDepartureDate": "2025-09-20", "segmentOfDeparture": "PAR", "segmentOfArrival": "DOH" } ]
}
```

curl (PowerShell):

```powershell
curl -X POST http://localhost:3000/api/booking -H "Content-Type: application/json" -d (Get-Content -Raw .\booking.json)
```

3) Create booking (POST)

Minimal required fields (inferred from spec): `customerDetails`, `documentDetails`, `productCommodityDetails`, `shipmentQuantityDetails`, `requestRefId`, `requestType`, `flightItineraries`.

Request example (inline JSON):

JSON body:

```json
{
  "customerDetails": { "agentCassCode": "7515", "agentIataCode": "2045131" },
  "documentDetails": { "airWaybillIssuePlace": "PAR", "airWaybillNumber": "1234567", "airWaybillorigin": "PAR", "airWaybilldestination": "MCT", "airlinePrefix": 157, "documentType": "MAWB", "airWaybillCurrency": "EUR" },
  "productCommodityDetails": { "productCode": "GCR", "commodityCode": "9999" },
  "shipmentQuantityDetails": { "chargeableWeight": 30, "chargeableWeightUnit": "Kg", "totalPieces": 1, "totalVolume": 0.064, "totalWeight": 30, "volumeUnit": "MC", "weightUnit": "Kg" },
  "requestRefId": "1550677",
  "requestType": "1",
  "flightItineraries": [ { "carrierCode": "QR", "carrierNumber": "3500", "scheduledDepartureDate": "2025-09-20", "segmentOfDeparture": "PAR", "segmentOfArrival": "DOH" } ]
}
```

Response (example):

```json
{
  "shipmentReferenceNum": "2630058",
  "currentBookingStatus": "Queued for Manual Action",
  "bookingCaptured": true,
  "customerDetails": { /* echoed */ },
  "documentDetails": { /* echoed */ },
  "flightItineraries": [ /* echoed */ ],
  "createdAt": "2025-09-14T12:00:00.000Z"
}
```

```json
{ "awbPrefix": "157", "awbNumber": "12345678", "origin": "DOH", "destination": "LHR" }
```

9) Shipment track (POST)

JSON body:

```json
{ "cargoTrackingRequestSOs": [ { "documentType": "MAWB", "documentPrefix": "157", "documentNumber": "12345678" } ] }
```

10) Stock (POST)

JSON body:

```json
{ "customerDetails": { "agentCassCode": "9900", "agentIataCode": "6580121" }, "bookingRequestedCity": "DOH" }
```

Notes:
- The curl commands above are formatted for PowerShell; on Linux/macOS replace the PowerShell `Get-Content -Raw` usage with `-d @file.json` or use `cat file.json | curl -X POST -H "Content-Type: application/json" -d @- http://...`.
- If you prefer `httpie` or Postman examples I can add them.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


curl -X POST 'http://localhost:3000/api/flight-schedules/weekly' -H "Content-Type: application/json" -d '{"origin":"CDG","destination":"DOH","weekStartDate":"2025-09-20"}'