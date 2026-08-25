import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { sendTestEmail } from '@/lib/email'

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const result = await sendTestEmail()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 })
  }
}