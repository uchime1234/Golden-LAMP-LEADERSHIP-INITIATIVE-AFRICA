import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const trainings = getItems('trainings.json')
  return NextResponse.json(trainings)
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newTraining = addItem('trainings.json', data)
    return NextResponse.json(newTraining)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add training' }, { status: 500 })
  }
}