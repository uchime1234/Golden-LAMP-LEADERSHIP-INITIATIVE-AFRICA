import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Run the sync script
    const { stdout, stderr } = await execAsync('node scripts/sync-github.js')
    
    if (stderr) {
      console.error('Sync error:', stderr)
      return NextResponse.json({ 
        success: false, 
        error: stderr 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Synced to GitHub successfully',
      output: stdout 
    })
  } catch (error: any) {
    console.error('Sync error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}