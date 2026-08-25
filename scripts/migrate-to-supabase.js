import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// ✅ Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// ✅ Check if variables exist
if (!supabaseUrl) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local')
  console.error('Please add: NEXT_PUBLIC_SUPABASE_URL=https://iwbomwsorvalfneiozkc.supabase.co')
  process.exit(1)
}

if (!supabaseKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.error('Please add: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key')
  process.exit(1)
}

console.log('✅ Found Supabase URL:', supabaseUrl)
console.log('✅ Found Service Role Key (hidden)')

const supabase = createClient(supabaseUrl, supabaseKey)

// Save data function
async function saveTableData(tableName, data) {
  const { error } = await supabase
    .from(tableName)
    .upsert({ id: '1', data, updated_at: new Date().toISOString() })
  
  if (error) {
    console.error(`Error saving ${tableName}:`, error)
    throw error
  }
  
  return data
}

const dataFiles = [
  'events',
  'trainings', 
  'team',
  'mentors',
  'testimonials',
  'home',
  'about',
  'initiatives'
]

async function migrateData() {
  console.log('\n🚀 Migrating to Supabase...\n')

  for (const file of dataFiles) {
    try {
      const filePath = path.join(process.cwd(), 'data', `${file}.json`)
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file}.json not found, skipping...`)
        continue
      }

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      await saveTableData(file, data)
      
      console.log(`✅ Migrated: ${file}.json → ${data.length} items`)
    } catch (error) {
      console.error(`❌ Failed to migrate ${file}.json:`, error.message)
    }
  }

  console.log('\n🎉 Migration complete!')
}

migrateData()