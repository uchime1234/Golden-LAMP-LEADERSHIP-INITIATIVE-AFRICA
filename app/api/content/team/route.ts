import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  const team = getItems('team.json')
  return NextResponse.json(team)
}

// ✅ AUTH REQUIRED - Only admin can create
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newMember = addItem('team.json', data)
    return NextResponse.json(newMember)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 })
  }
}