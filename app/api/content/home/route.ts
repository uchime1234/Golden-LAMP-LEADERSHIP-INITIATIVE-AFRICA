import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getTableData, saveTableData } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    const cached = getCached('home')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    const homeData = await getTableData('home')
    setCached('home', homeData)
    return NextResponse.json(homeData)
  } catch (error) {
    console.error('Error fetching home data:', error)
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    await saveTableData('home', data)
    invalidateCache('home')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating home data:', error)
    return NextResponse.json({ error: 'Failed to update home data' }, { status: 500 })
  }
}