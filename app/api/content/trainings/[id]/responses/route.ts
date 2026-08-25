 
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { getResponses, getResponseCount } from '@/lib/superbase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')
    
    const responses = await getResponses(id)
    const count = await getResponseCount(id)
    
    // If CSV format requested
    if (format === 'csv') {
      return exportCSV(responses)
    }
    
    return NextResponse.json({ responses, count })
  } catch (error) {
    console.error('Error fetching responses:', error)
    return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
  }
}

// Helper to export CSV
function exportCSV(responses: any[]) {
  if (!responses || responses.length === 0) {
    return new Response('No responses available', { status: 404 })
  }
  
  // Get all field keys from the first response
  const firstData = responses[0]?.data || {}
  const headers = Object.keys(firstData)
  
  // Build CSV rows
  let csv = headers.join(',') + '\n'
  csv += 'Submitted At,' + headers.join(',') + '\n'
  
  for (const response of responses) {
    const row = [response.submitted_at]
    for (const header of headers) {
      const value = response.data[header] || ''
      // Escape commas and quotes
      const escaped = String(value).replace(/"/g, '""')
      row.push(`"${escaped}"`)
    }
    csv += row.join(',') + '\n'
  }
  
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=responses_${Date.now()}.csv`
    }
  })
}