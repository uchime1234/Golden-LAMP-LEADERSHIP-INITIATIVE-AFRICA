import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getItems, addItem } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    const cached = getCached('team')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    const team = await getItems('team')
    setCached('team', team)
    return NextResponse.json(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newMember = await addItem('team', data)
    invalidateCache('team')
    return NextResponse.json(newMember)
  } catch (error) {
    console.error('Error adding team member:', error)
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 })
  }
}