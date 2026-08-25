import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getItems, addItem } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    const cached = getCached('mentors')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    const mentors = await getItems('mentors')
    setCached('mentors', mentors)
    return NextResponse.json(mentors)
  } catch (error) {
    console.error('Error fetching mentors:', error)
    return NextResponse.json({ error: 'Failed to fetch mentors' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newMentor = await addItem('mentors', data)
    invalidateCache('mentors')
    return NextResponse.json(newMentor)
  } catch (error) {
    console.error('Error adding mentor:', error)
    return NextResponse.json({ error: 'Failed to add mentor' }, { status: 500 })
  }
}