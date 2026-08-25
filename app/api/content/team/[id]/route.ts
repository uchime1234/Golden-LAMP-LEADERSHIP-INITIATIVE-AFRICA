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
    const item = await getItem('team', id)
    if (!item) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 })
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
    const updated = await updateItem('team', id, data)
    if (!updated) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    invalidateCache('team')
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
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
      await permanentDelete('team', id)
    } else {
      await softDelete('team', id)
    }
    invalidateCache('team')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
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
      const restored = await restoreItem('team', id)
      invalidateCache('team')
      return NextResponse.json(restored)
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error restoring team member:', error)
    return NextResponse.json({ error: 'Failed to restore' }, { status: 500 })
  }
}