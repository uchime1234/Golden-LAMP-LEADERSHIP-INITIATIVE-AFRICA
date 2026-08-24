import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { readData, writeData } from '@/lib/data'

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const sections = ['events', 'trainings', 'team', 'mentors', 'testimonials']
    const allTrash = []
    
    for (const section of sections) {
      const items = readData(`${section}.json`)
      const trashed = items
        .filter((item: any) => item.deleted === true)
        .map((item: any) => ({ ...item, type: section }))
      allTrash.push(...trashed)
    }
    
    return NextResponse.json(allTrash)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trash' }, { status: 500 })
  }
}

export async function DELETE() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const sections = ['events', 'trainings', 'team', 'mentors', 'testimonials']
    
    for (const section of sections) {
      const items = readData(`${section}.json`)
      const filtered = items.filter((item: any) => !item.deleted)
      writeData(`${section}.json`, filtered)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to empty trash' }, { status: 500 })
  }
}