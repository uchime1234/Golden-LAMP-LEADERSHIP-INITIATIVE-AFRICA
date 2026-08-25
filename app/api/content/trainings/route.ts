import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getItems, addItem } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    // Try cache first
    const cached = getCached('trainings')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // If not cached, fetch from Supabase
    const trainings = await getItems('trainings')
    setCached('trainings', trainings)
    
    return NextResponse.json(trainings)
  } catch (error) {
    console.error('Error fetching trainings:', error)
    return NextResponse.json({ error: 'Failed to fetch trainings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newTraining = await addItem('trainings', data)
    
    // Clear cache so new training appears
    invalidateCache('trainings')
    
    return NextResponse.json(newTraining)
  } catch (error) {
    console.error('Error adding training:', error)
    return NextResponse.json({ error: 'Failed to add training' }, { status: 500 })
  }
}