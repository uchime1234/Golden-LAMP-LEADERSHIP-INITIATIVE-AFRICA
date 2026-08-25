import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getTableData, saveTableData } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    const cached = getCached('initiatives')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    const initiativesData = await getTableData('initiatives')
    setCached('initiatives', initiativesData)
    return NextResponse.json(initiativesData)
  } catch (error) {
    console.error('Error fetching initiatives data:', error)
    return NextResponse.json({ error: 'Failed to fetch initiatives data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    await saveTableData('initiatives', data)
    invalidateCache('initiatives')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating initiatives data:', error)
    return NextResponse.json({ error: 'Failed to update initiatives data' }, { status: 500 })
  }
}