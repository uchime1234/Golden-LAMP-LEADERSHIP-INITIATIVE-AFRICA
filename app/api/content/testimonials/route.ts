import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { addItem, getItems } from '@/lib/data'

// ✅ NO AUTH - Public can read
export async function GET() {
  const testimonials = getItems('testimonials.json')
  return NextResponse.json(testimonials)
}

// ✅ AUTH REQUIRED - Only admin can create
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