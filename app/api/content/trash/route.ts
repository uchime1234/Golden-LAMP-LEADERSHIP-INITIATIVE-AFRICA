import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getTableData, saveTableData } from '@/lib/superbase'

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const sections = ['events', 'trainings', 'team', 'mentors', 'testimonials']
    const allTrash = []
    
    for (const section of sections) {
      const items = await getTableData(section)
      const trashed = items
        .filter((item: any) => item.deleted === true)
        .map((item: any) => ({ ...item, type: section }))
      allTrash.push(...trashed)
    }
    
    return NextResponse.json(allTrash)
  } catch (error) {
    console.error('Error fetching trash:', error)
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
      const items = await getTableData(section)
      const filtered = items.filter((item: any) => !item.deleted)
      await saveTableData(section, filtered)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error emptying trash:', error)
    return NextResponse.json({ error: 'Failed to empty trash' }, { status: 500 })
  }
}