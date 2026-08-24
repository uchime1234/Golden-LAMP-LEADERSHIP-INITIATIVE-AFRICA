import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const mentors = getItems('mentors.json')
  return NextResponse.json(mentors)
}

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