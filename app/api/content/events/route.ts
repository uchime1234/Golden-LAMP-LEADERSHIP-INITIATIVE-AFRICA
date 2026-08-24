import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  const events = getItems('events.json')
  return NextResponse.json(events)
}

// ✅ AUTH REQUIRED - Only admin can create
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newEvent = addItem('events.json', data)
    return NextResponse.json(newEvent)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 })
  }
}