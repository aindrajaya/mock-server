import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.vehicle || !body.driver || !body.cargo || !body.route) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['vehicle', 'driver', 'cargo', 'route']
        },
        { status: 400 }
      )
    }

    const manifestData = {
      manifestId: `MAN${Date.now()}`,
      status: 'created',
      createdAt: new Date().toISOString(),
      vehicle: {
        registration: body.vehicle.registration,
        type: body.vehicle.type,
        capacity: body.vehicle.capacity,
        bonded: body.vehicle.bonded || true
      },
      driver: {
        name: body.driver.name,
        license: body.driver.license,
        contact: body.driver.contact
      },
      cargo: body.cargo.map(item => ({
        awbNumber: item.awbNumber,
        pieces: item.pieces,
        weight: item.weight,
        volume: item.volume,
        origin: item.origin,
        destination: item.destination,
        specialHandling: item.specialHandling || []
      })),
      route: {
        origin: body.route.origin,
        destination: body.route.destination,
        plannedDeparture: body.route.plannedDeparture,
        estimatedArrival: body.route.estimatedArrival,
        checkpoints: body.route.checkpoints || []
      },
      security: {
        sealNumber: body.security?.sealNumber || `SEAL${Date.now()}`,
        securityCheck: 'passed',
        bondedTransport: true
      },
      customs: {
        declaration: body.customs?.declaration || 'Bonded transit',
        clearanceStatus: 'approved',
        transitPermit: `TP${Date.now()}`
      },
      tracking: {
        gpsEnabled: true,
        lastLocation: null,
        eta: body.route.estimatedArrival
      }
    }

    return NextResponse.json(manifestData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
