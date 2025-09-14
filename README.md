# Mock Server — Availability & Booking APIs

This repository provides simple mock implementations for several cargo-related APIs. It's a Next.js app (app router) with mocked responses under `app/api/*`.

## Available endpoints

- `GET /api/status` — health check
- `POST /api/availability` — availability & rate search (mocked)
- `POST /api/booking` — create booking (mocked)
- `DELETE /api/booking` — cancel booking (mocked)
- `POST /api/flight-schedules/daily` — daily flight schedules
- `POST /api/flight-schedules/weekly` — weekly flight schedules
- `POST /api/shipment/fwb-capture` — FWB capture
# Mock Server — Availability & Booking APIs

This repository provides simple mock implementations for several cargo-related APIs. It's a Next.js app (app router) with mocked responses under `app/api/*`.

## Available endpoints

- `GET /api/status` — health check
- `POST /api/availability` — availability & rate search (mocked)
- `POST /api/booking` — create booking (mocked)
- `DELETE /api/booking` — cancel booking (mocked)
- `POST /api/flight-schedules/daily` — daily flight schedules
- `POST /api/flight-schedules/weekly` — weekly flight schedules
- `POST /api/shipment/fwb-capture` — FWB capture
- `POST /api/shipment/track` — shipment tracking
- `POST /api/stock` — stock assignment
- `GET /api/flight-table` — get mock flight table
- `GET /api/airway-bill-table` — get mock airway bill table
- `GET /api/report` — get mock report

### ACS Cargo APIs

#### AWB Stock Management
- `POST /api/awb-stock/request` — Request AWB stock allocation
- `PUT /api/awb-stock/reply/{requestId}` — Reply to AWB stock request

#### Flight Schedules & Capacity
- `POST /api/flights/schedule` — Submit flight schedule
- `GET /api/flights/{flightNumber}/capacity` — Get flight capacity information

#### Quotations & Bookings
- `POST /api/quotes/request` — Request quotation
- `POST /api/bookings` — Create booking

#### Advanced Shipment Information (ASI)
- `POST /api/asi` — Send Advanced Shipment Information

#### Truck Slot Management
- `POST /api/truck-slots/request` — Request truck slot

#### HAWB/MAWB Management
- `POST /api/hawb` — Create House Air Waybill

#### Dangerous Goods
- `POST /api/dangerous-goods` — Submit Dangerous Goods Declaration (e-DGD)

#### Cargo Acceptance
- `POST /api/cargo-acceptance` — Submit cargo acceptance request

#### PLACI Management
- `POST /api/placi` — Submit PLACI (Pre-Loading Cargo Information)
- `GET /api/placi/{placiId}/risk-assessment` — Get PLACI risk assessment

#### Flight Manifest
- `POST /api/flight-manifest` — Submit flight manifest

#### Status Updates
- `POST /api/status-updates` — Send status update (FSU - Freight Status Update)

#### Payment Processing
- `POST /api/payments` — Process payment

#### Digital Pouch
- `POST /api/digital-pouch` — Create digital document pouch

## API Documentation

Complete API documentation is available in OpenAPI 3.0.3 format at `openapi/openapi.json`. This includes detailed request/response schemas, authentication requirements, and example payloads for all endpoints.

## Authentication

All `/api/*` endpoints are protected by a simple API key. Provide the key using either:

- Authorization header: `Authorization: Bearer <API_KEY>`
- x-api-key header: `x-api-key: <API_KEY>`

Default token (development): `mockserver-secret`

Example curl (replace <API_KEY> with your token):

```bash
curl -X POST http://localhost:3000/api/flight-schedules/weekly \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mockserver-secret" \
  -d '{ "origin": "CDG", "destination": "DOH", "weekStartDate": "2025-09-20" }'
```

## Examples

Use curl, httpie, Postman, or any HTTP client. All requests to `/api/*` must include the API key (see Authentication).

### GET /api/flight-table

Returns a list of mock flights:

```json
{
  "flights": [
    {
      "id": 1,
      "flight": "QR123",
      "date": "2025-09-20",
      "origin": "CDG",
      "departureTime": "10:00",
      "destination": "DOH",
      "arrivalTime": "16:00",
      "weight": 120000,
      "volume": 500,
      "status": "Scheduled",
      "baseRate": 3.5,
      "outputRate": 3.8,
      "tailNumber": "AP-XYZ",
      "manufacturer": "Boeing",
      "aircraftType": "Boeing 777-300ER",
      "maxWeight": 160000,
      "maxVolume": 650
    },
    // ...more flights
  ]
}
```

### GET /api/airway-bill-table

Returns a list of mock airway bills:

```json
{
  "airwayBills": [
    {
      "id": 1,
      "awbNumber": "123-12345678",
      "pieces": 10,
      "chargedWeight": 500,
      "commodityCode": "PER",
      "specialHandling": "ICE",
      "shipper": "Global Logistics Ltd",
      "consignee": "Tech Innovations Inc",
      "natureOfGoods": "Electronic components",
      "shipmentValue": 50000,
      "valuationCharges": 2.5,
      "awbCharges": 50,
      "ratePlan": "Standard Rates",
      "productType": "Express",
      "currency": "USD",
      "totalCharges": 2552.5
    },
    // ...more airway bills
  ]
}
```

### GET /api/report

Returns a mock report summary:

```json
{
  "report": {
    "period": {
      "startDate": "2025-09-15",
      "endDate": "2025-10-15"
    },
    "totalRevenue": 123456.78,
    "revenuePerKg": 2.45,
    "totalFlights": 50,
    "volumeUtilization": 75.2,
    "weightUtilization": 82.1,
    "avgRevenuePerFlight": 2469.13,
    "avgLoadPerFlight": 500.2,
    "lanePerformance": [
      {
        "origin": "CDG",
        "destination": "DOH",
        "flights": 5,
        "totalWeight": 6000,
        "totalVolume": 2500,
        "totalRevenue": 15000
      }
      // ...more lanes
    ],
    "bookingLeadTime": 3.5,
    "flightOnTimePercentage": 92.3,
    "delayCauses": [
      { "cause": "Weather", "percentage": 40 },
      { "cause": "Technical", "percentage": 25 }
      // ...more causes
    ],
    "topCommodityTypes": [
      { "code": "PER", "count": 20 }
      // ...more commodities
    ],
    "topShippers": [
      { "shipper": "Global Logistics Ltd", "revenue": 20000 }
      // ...more shippers
    ],
    "currency": "USD"
  }
}
```
# Mock Server — Availability & Booking APIs

This repository provides simple mock implementations for several cargo-related APIs. It's a Next.js app (app router) with mocked responses under `app/api/*`.

## Available endpoints

- `GET /api/status` — health check
- `POST /api/availability` — availability & rate search (mocked)
- `POST /api/booking` — create booking (mocked)
- `DELETE /api/booking` — cancel booking (mocked)
- `POST /api/flight-schedules/daily` — daily flight schedules
- `POST /api/flight-schedules/weekly` — weekly flight schedules
- `POST /api/shipment/fwb-capture` — FWB capture
- `POST /api/shipment/track` — shipment tracking
- `POST /api/stock` — stock assignment

## Authentication

All `/api/*` endpoints are protected by a simple API key. Provide the key using either:

- Authorization header: `Authorization: Bearer <API_KEY>`
- x-api-key header: `x-api-key: <API_KEY>`

Default token (development): `mockserver-secret`

Example curl (replace <API_KEY> with your token):

```bash
curl -X POST http://localhost:3000/api/flight-schedules/weekly \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mockserver-secret" \
  -d '{ "origin": "CDG", "destination": "DOH", "weekStartDate": "2025-09-20" }'
```

## Examples

Use curl, httpie, Postman, or any HTTP client. All requests to `/api/*` must include the API key (see Authentication).
# Mock Server — Availability & Booking APIs

This repository provides simple mock implementations for several cargo-related APIs. It's a Next.js app (app router) with mocked responses under `app/api/*`.

## Available endpoints

- `GET /api/status` — health check
- `POST /api/availability` — availability & rate search (mocked)
- `POST /api/booking` — create booking (mocked)
- `DELETE /api/booking` — cancel booking (mocked)
- `POST /api/flight-schedules/daily` — daily flight schedules
- `POST /api/flight-schedules/weekly` — weekly flight schedules
- `POST /api/shipment/fwb-capture` — FWB capture
- `POST /api/shipment/track` — shipment tracking
- `POST /api/stock` — stock assignment

## Authentication

All `/api/*` endpoints are protected by a simple API key. Provide the key using either:

- Authorization header: `Authorization: Bearer <API_KEY>`
- x-api-key header: `x-api-key: <API_KEY>`

Default token (development): `mockserver-secret`

Example curl (replace <API_KEY> with your token):

```bash
curl -X POST http://localhost:3000/api/flight-schedules/weekly \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mockserver-secret" \
  -d '{ "origin": "CDG", "destination": "DOH", "weekStartDate": "2025-09-20" }'
```

## Examples

Use curl, httpie, Postman, or any HTTP client. All requests to `/api/*` must include the API key (see Authentication).

1) Health check

GET /api/status

Response (example):

```json
{
  "success": true,
  "apiName": "Availability-v1-mocking",
  "version": "1.0",
  "timestamp": "2025-09-14T12:00:00.000Z"
}
```

2) Availability search — POST /api/availability

Request JSON:

```json
{
  "origin": "CDG",
  "destination": "BOM",
  "routingPreference": { "scheduledDepartureDate": "2025-09-20" }
}
```

3) Create booking — POST /api/booking

Request JSON (minimal example):

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

4) Cancel booking — DELETE /api/booking

Request JSON:

```json
{ "shipmentReferenceNum": "2630058" }
```

5) Flight schedules (daily) — POST /api/flight-schedules/daily

Request JSON:

```json
{ "origin": "CDG", "destination": "DOH", "date": "2025-09-20" }
```

6) Flight schedules (weekly) — POST /api/flight-schedules/weekly

Request JSON:

```json
{ "origin": "CDG", "destination": "DOH", "weekStartDate": "2025-09-20" }
```

7) FWB capture — POST /api/shipment/fwb-capture

Request JSON:

```json
{ "awbPrefix": "157", "awbNumber": "12345678", "origin": "DOH", "destination": "LHR" }
```

8) Shipment track — POST /api/shipment/track

Request JSON:

```json
{ "cargoTrackingRequestSOs": [ { "documentType": "MAWB", "documentPrefix": "157", "documentNumber": "12345678" } ] }
```

9) Stock — POST /api/stock

Request JSON:

```json
{ "customerDetails": { "agentCassCode": "9900", "agentIataCode": "6580121" }, "bookingRequestedCity": "DOH" }
```

Notes:

- The examples above are JSON-only. Use your preferred client to POST the JSON bodies. If you use curl on Linux/macOS you can send a file with `-d @file.json`.
- If you prefer httpie or Postman examples I can add them.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser to explore the mock endpoints.

## Learn More

See the Next.js docs for app-router details and deployment guidance.

  "customerDetails": { "agentCassCode": "7515", "agentIataCode": "2045131" },
  "documentDetails": { "airWaybillIssuePlace": "PAR", "airWaybillNumber": "1234567", "airWaybillorigin": "PAR", "airWaybilldestination": "MCT", "airlinePrefix": 157, "documentType": "MAWB", "airWaybillCurrency": "EUR" },
  "productCommodityDetails": { "productCode": "GCR", "commodityCode": "9999" },
  "shipmentQuantityDetails": { "chargeableWeight": 30, "chargeableWeightUnit": "Kg", "totalPieces": 1, "totalVolume": 0.064, "totalWeight": 30, "volumeUnit": "MC", "weightUnit": "Kg" },
  "requestRefId": "1550677",
  "requestType": "1",
  "flightItineraries": [ { "carrierCode": "QR", "carrierNumber": "3500", "scheduledDepartureDate": "2025-09-20", "segmentOfDeparture": "PAR", "segmentOfArrival": "DOH" } ]
}
```

4) Cancel booking — DELETE /api/booking

Request JSON:

```json
{ "shipmentReferenceNum": "2630058" }
```

5) Flight schedules (daily) — POST /api/flight-schedules/daily

Request JSON:

```json
{ "origin": "CDG", "destination": "DOH", "date": "2025-09-20" }
```

6) Flight schedules (weekly) — POST /api/flight-schedules/weekly

Request JSON:

```json
{ "origin": "CDG", "destination": "DOH", "weekStartDate": "2025-09-20" }
```

7) FWB capture — POST /api/shipment/fwb-capture

Request JSON:

```json
{ "awbPrefix": "157", "awbNumber": "12345678", "origin": "DOH", "destination": "LHR" }
```

8) Shipment track — POST /api/shipment/track

Request JSON:

```json
{ "cargoTrackingRequestSOs": [ { "documentType": "MAWB", "documentPrefix": "157", "documentNumber": "12345678" } ] }
```

9) Stock — POST /api/stock

Request JSON:

```json
{ "customerDetails": { "agentCassCode": "9900", "agentIataCode": "6580121" }, "bookingRequestedCity": "DOH" }
```
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