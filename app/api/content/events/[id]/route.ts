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
    const item = await getItem('events', id)
    if (!item) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
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
    const updated = await updateItem('events', id, data)
    if (!updated) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    
    // Clear cache after update
    invalidateCache('events')
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
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
      await permanentDelete('events', id)
    } else {
      await softDelete('events', id)
    }
    
    // Clear cache after delete
    invalidateCache('events')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
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
      const restored = await restoreItem('events', id)
      
      // Clear cache after restore
      invalidateCache('events')
      
      return NextResponse.json(restored)
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error restoring event:', error)
    return NextResponse.json({ error: 'Failed to restore' }, { status: 500 })
  }
}