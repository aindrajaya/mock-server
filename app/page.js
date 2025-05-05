export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Flight Management API Mock Server</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold mb-4">Available API Endpoints</h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Flights API</h3>
                  <p className="text-gray-600 mb-2">
                    Manage flight data including schedules, cargo capacity, and status.
                  </p>
                  <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                    GET /api/flights?page=1&limit=10&origin=KHI&destination=DXB&status=Scheduled&date=2023-05-15
                  </div>
                  <div className="mt-2 bg-gray-100 p-3 rounded text-sm font-mono">POST /api/flights</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Airway Bills API</h3>
                  <p className="text-gray-600 mb-2">Track and manage airway bill data for shipments.</p>
                  <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                    GET /api/airway-bills?page=1&limit=10&awbNumber=106-10001902&shipper=Global&commodityCode=PER
                  </div>
                  <div className="mt-2 bg-gray-100 p-3 rounded text-sm font-mono">POST /api/airway-bills</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Reports API</h3>
                  <p className="text-gray-600 mb-2">
                    Get aggregated insights across flight operations and cargo movement.
                  </p>
                  <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                    GET /api/reports?startDate=2023-01-01&endDate=2023-12-31&currency=USD
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Testing the API</h3>
                <p className="text-gray-600">
                  You can test these endpoints using tools like Postman, cURL, or directly from your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
