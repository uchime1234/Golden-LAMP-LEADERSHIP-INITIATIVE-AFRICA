import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getItems, addItem } from '@/lib/superbase'
import { getCached, setCached, invalidateCache } from '@/lib/cache'

export async function GET() {
  try {
    const cached = getCached('testimonials')
    if (cached) {
      return NextResponse.json(cached)
    }
    
    const testimonials = await getItems('testimonials')
    setCached('testimonials', testimonials)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const newTestimonial = await addItem('testimonials', data)
    invalidateCache('testimonials')
    return NextResponse.json(newTestimonial)
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 })
  }
}