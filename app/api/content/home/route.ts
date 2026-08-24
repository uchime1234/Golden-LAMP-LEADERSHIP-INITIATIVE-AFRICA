import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { readData, writeData } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  try {
    const homeData = readData('home.json')
    return NextResponse.json(homeData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 })
  }
}

// ✅ AUTH REQUIRED - Only admin can update
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    writeData('home.json', data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update home data' }, { status: 500 })
  }
}