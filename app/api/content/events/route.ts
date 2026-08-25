import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getItems, addItem } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

// ✅ GET - With caching
export async function GET() {
  try {
    // Try cache first
    const cached = getCached('events')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // If not cached, fetch from Supabase
    const events = await getItems('events')
    setCached('events', events) // Cache for 30 seconds
    
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

// ✅ POST - Clears cache when new event is added
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newEvent = await addItem('events', data)
    
    // Clear cache so new event appears
    invalidateCache('events')
    
    return NextResponse.json(newEvent)
  } catch (error) {
    console.error('Error adding event:', error)
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 })
  }
}