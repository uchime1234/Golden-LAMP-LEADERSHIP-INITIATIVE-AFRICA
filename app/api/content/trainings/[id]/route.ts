import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { updateItem, softDelete, restoreItem, permanentDelete, getItem } from '@/lib/superbase'
import { invalidateCache } from '@/lib/cache'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const item = await getItem('trainings', id)
    if (!item) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching training:', error)
    return NextResponse.json({ error: 'Failed to fetch training' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const data = await request.json()
    const updated = await updateItem('trainings', id, data)
    if (!updated) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    
    // Clear cache after update
    invalidateCache('trainings')
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating training:', error)
    return NextResponse.json({ error: 'Failed to update training' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const permanent = searchParams.get('permanent') === 'true'
    
    if (permanent) {
      await permanentDelete('trainings', id)
    } else {
      await softDelete('trainings', id)
    }
    
    // Clear cache after delete
    invalidateCache('trainings')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting training:', error)
    return NextResponse.json({ error: 'Failed to delete training' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const { action } = await request.json()
    if (action === 'restore') {
      const restored = await restoreItem('trainings', id)
      
      // Clear cache after restore
      invalidateCache('trainings')
      
      return NextResponse.json(restored)
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error restoring training:', error)
    return NextResponse.json({ error: 'Failed to restore' }, { status: 500 })
  }
}