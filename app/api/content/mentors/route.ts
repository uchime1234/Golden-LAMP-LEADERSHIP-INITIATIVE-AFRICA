import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  const mentors = getItems('mentors.json')
  return NextResponse.json(mentors)
}

// ✅ AUTH REQUIRED - Only admin can create
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newMentor = addItem('mentors.json', data)
    return NextResponse.json(newMentor)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add mentor' }, { status: 500 })
  }
}