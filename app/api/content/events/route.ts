// app/api/content/events/route.ts
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getItems, addItem } from '@/lib/superbase'  // ← Import from supabase.js

export async function GET() {
  try {
    const events = await getItems('events')
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newEvent = await addItem('events', data)
    return NextResponse.json(newEvent)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 })
  }
}