import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getTableData, saveTableData } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    const cached = getCached('about')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    const aboutData = await getTableData('about')
    setCached('about', aboutData)
    return NextResponse.json(aboutData)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    await saveTableData('about', data)
    invalidateCache('about')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating about data:', error)
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
  }
}