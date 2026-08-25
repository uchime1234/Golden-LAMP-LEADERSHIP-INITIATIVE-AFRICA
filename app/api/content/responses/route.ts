 
import { NextResponse } from 'next/server'
import { submitResponse } from '@/lib/superbase'

export async function POST(request: Request) {
  try {
    const { trainingId, formId, data } = await request.json()
    
    if (!trainingId || !formId || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const result = await submitResponse(trainingId, formId, data)
    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Error submitting response:', error)
    return NextResponse.json(
      { error: 'Failed to submit response' },
      { status: 500 }
    )
  }
}