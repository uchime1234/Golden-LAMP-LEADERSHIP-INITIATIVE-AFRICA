import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { readData, writeData } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  try {
    const data = readData('initiatives.json')
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch initiatives data' }, { status: 500 })
  }
}

// ✅ AUTH REQUIRED - Only admin can update
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    writeData('initiatives.json', data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update initiatives data' }, { status: 500 })
  }
}