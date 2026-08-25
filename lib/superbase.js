import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase environment variables are missing.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
)

// ========== EXISTING FUNCTIONS ==========

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

export async function getItems(tableName) {
  const items = await getTableData(tableName)
  return items.filter(item => !item.deleted)
}

export async function addItem(tableName, item) {
  const items = await getTableData(tableName)
  item.id = Date.now().toString()
  item.createdAt = new Date().toISOString()
  item.deleted = false
  items.unshift(item)
  await saveTableData(tableName, items)
  return item
}

export async function updateItem(tableName, id, updates) {
  const items = await getTableData(tableName)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
  await saveTableData(tableName, items)
  return items[index]
}

export async function softDelete(tableName, id) {
  const items = await getTableData(tableName)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index].deleted = true
  items[index].deletedAt = new Date().toISOString()
  await saveTableData(tableName, items)
  return items[index]
}

export async function restoreItem(tableName, id) {
  const items = await getTableData(tableName)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index].deleted = false
  items[index].deletedAt = null
  await saveTableData(tableName, items)
  return items[index]
}

export async function permanentDelete(tableName, id) {
  const items = await getTableData(tableName)
  const filtered = items.filter(item => item.id !== id)
  await saveTableData(tableName, filtered)
  return true
}

export async function getItem(tableName, id) {
  const items = await getTableData(tableName)
  return items.find(item => item.id === id) || null
}

// ========== FORM FUNCTIONS ==========

// Get form for a specific training
export async function getForm(trainingId) {
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .eq('training_id', trainingId)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching form:', error)
  }
  
  return data || null
}

// Save form for a training
export async function saveForm(trainingId, fields, active = true) {
  const formId = `form_${trainingId}`
  const { data, error } = await supabase
    .from('forms')
    .upsert({
      id: formId,
      training_id: trainingId,
      fields: fields,
      active: active,
      updated_at: new Date().toISOString()
    })
  
  if (error) {
    console.error('Error saving form:', error)
    throw error
  }
  
  return data
}

// Delete form for a training
export async function deleteForm(trainingId) {
  const { error } = await supabase
    .from('forms')
    .delete()
    .eq('training_id', trainingId)
  
  if (error) {
    console.error('Error deleting form:', error)
    throw error
  }
  
  return true
}

// Get all responses for a training
export async function getResponses(trainingId) {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('training_id', trainingId)
    .order('submitted_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching responses:', error)
    return []
  }
  
  return data || []
}

// Submit a response
export async function submitResponse(trainingId, formId, data) {
  const responseId = `resp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
  const { error } = await supabase
    .from('responses')
    .insert({
      id: responseId,
      training_id: trainingId,
      form_id: formId,
      data: data,
      submitted_at: new Date().toISOString()
    })
  
  if (error) {
    console.error('Error submitting response:', error)
    throw error
  }
  
  return { id: responseId, success: true }
}

// Get response count for a training
export async function getResponseCount(trainingId) {
  const { count, error } = await supabase
    .from('responses')
    .select('*', { count: 'exact', head: true })
    .eq('training_id', trainingId)
  
  if (error) {
    console.error('Error counting responses:', error)
    return 0
  }
  
  return count || 0
}