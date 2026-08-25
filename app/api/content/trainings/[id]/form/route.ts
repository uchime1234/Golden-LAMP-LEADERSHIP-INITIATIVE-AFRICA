 
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getForm, saveForm, deleteForm } from '@/lib/superbase'

// GET - Get form for a training
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { id } = await params
    const form = await getForm(id)
    return NextResponse.json(form || { fields: [], active: true })
  } catch (error) {
    console.error('Error fetching form:', error)
    return NextResponse.json({ error: 'Failed to fetch form' }, { status: 500 })
  }
}

// POST - Save form for a training
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { id } = await params
    const { fields, active } = await request.json()
    const form = await saveForm(id, fields, active)
    return NextResponse.json({ success: true, form })
  } catch (error) {
    console.error('Error saving form:', error)
    return NextResponse.json({ error: 'Failed to save form' }, { status: 500 })
  }
}

// DELETE - Delete form for a training
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { id } = await params
    await deleteForm(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting form:', error)
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 })
  }
}