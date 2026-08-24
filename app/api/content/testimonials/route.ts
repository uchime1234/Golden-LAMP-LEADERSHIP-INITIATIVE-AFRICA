import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const testimonials = getItems('testimonials.json')
  return NextResponse.json(testimonials)
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newTestimonial = addItem('testimonials.json', data)
    return NextResponse.json(newTestimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 })
  }
}