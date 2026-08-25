import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Get all data from a table
export async function getTableData(tableName) {
  const { data, error } = await supabase
    .from(tableName)
    .select('data')
    .eq('id', '1')
    .single()
  
  if (error) {
    console.error(`Error fetching ${tableName}:`, error)
    return []
  }
  
  return data?.data || []
}

// Save data to a table
export async function saveTableData(tableName, data) {
  const { error } = await supabase
    .from(tableName)
    .upsert({ id: '1', data, updated_at: new Date().toISOString() })
  
  if (error) {
    console.error(`Error saving ${tableName}:`, error)
    throw error
  }
  
  return data
}

// Get items (excluding deleted)
export async function getItems(tableName) {
  const items = await getTableData(tableName)
  return items.filter(item => !item.deleted)
}

// Add new item
export async function addItem(tableName, item) {
  const items = await getTableData(tableName)
  item.id = Date.now().toString()
  item.createdAt = new Date().toISOString()
  item.deleted = false
  items.unshift(item)
  await saveTableData(tableName, items)
  return item
}

// Update item
export async function updateItem(tableName, id, updates) {
  const items = await getTableData(tableName)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
  await saveTableData(tableName, items)
  return items[index]
}

// Soft delete
export async function softDelete(tableName, id) {
  const items = await getTableData(tableName)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index].deleted = true
  items[index].deletedAt = new Date().toISOString()
  await saveTableData(tableName, items)
  return items[index]
}

// Restore from trash
export async function restoreItem(tableName, id) {
  const items = await getTableData(tableName)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index].deleted = false
  items[index].deletedAt = null
  await saveTableData(tableName, items)
  return items[index]
}

// Permanently delete
export async function permanentDelete(tableName, id) {
  const items = await getTableData(tableName)
  const filtered = items.filter(item => item.id !== id)
  await saveTableData(tableName, filtered)
  return true
}

// Get single item
export async function getItem(tableName, id) {
  const items = await getTableData(tableName)
  return items.find(item => item.id === id) || null
}