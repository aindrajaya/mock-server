import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()

    const bookingId = formData.get('bookingId')
    const documentType = formData.get('documentType')
    const file = formData.get('file')

    // Validate required fields
    if (!bookingId || !documentType || !file) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['bookingId', 'documentType', 'file']
        },
        { status: 400 }
      )
    }

    // Mock document processing
    const documentId = `DOC${Date.now()}`
    const documentData = {
      documentId: documentId,
      bookingId: bookingId,
      documentType: documentType,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
      processingStatus: 'pending',
      validationResults: {
        isValid: true,
        warnings: [],
        errors: []
      },
      downloadUrl: `/api/documents/${documentId}/download`,
      previewUrl: `/api/documents/${documentId}/preview`
    }

    // Simulate document type specific processing
    if (documentType === 'MSDS') {
      documentData.processingStatus = 'processed'
      documentData.extractedData = {
        unNumber: 'UN1234',
        properShippingName: 'Mock Chemical',
        hazardClass: '3',
        packingGroup: 'II'
      }
    } else if (documentType === 'COO') {
      documentData.processingStatus = 'processed'
      documentData.extractedData = {
        countryOfOrigin: 'US',
        certificateNumber: 'COO001234',
        issuedDate: '2024-01-10'
      }
    }

    return NextResponse.json(documentData, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
}
