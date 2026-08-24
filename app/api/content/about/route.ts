import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { readData, writeData } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  try {
    const aboutData = readData('about.json')
    return NextResponse.json(aboutData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}

// ✅ AUTH REQUIRED - Only admin can update
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    writeData('about.json', data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
  }
}