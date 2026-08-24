import fs from 'fs'
import path from 'path'
import { syncToGitHub } from '@/scripts/sync-github'

const dataDir = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Generic read function
export function readData(filename: string) {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]))
    return []
  }
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// Generic write function
export function writeData(filename: string, data: any) {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  
  // Auto-sync to GitHub (only in production)
  if (process.env.NODE_ENV === 'production') {
    try {
      syncToGitHub()
    } catch (error) {
      console.error('Failed to sync to GitHub:', error)
    }
  }
  
  return data
}

// Get items (excluding deleted)
export function getItems(filename: string) {
  const items = readData(filename)
  return items.filter((item: any) => !item.deleted)
}

// Get trashed items
export function getTrashed(filename: string) {
  const items = readData(filename)
  return items.filter((item: any) => item.deleted === true)
}

// Add new item
export function addItem(filename: string, item: any) {
  const items = readData(filename)
  item.id = Date.now().toString()
  item.createdAt = new Date().toISOString()
  item.deleted = false
  items.unshift(item)
  writeData(filename, items)
  return item
}

// Update item
export function updateItem(filename: string, id: string, updates: any) {
  const items = readData(filename)
  const index = items.findIndex((item: any) => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
  writeData(filename, items)
  return items[index]
}

// Soft delete (move to trash)
export function softDelete(filename: string, id: string) {
  const items = readData(filename)
  const index = items.findIndex((item: any) => item.id === id)
  if (index === -1) return null
  items[index].deleted = true
  items[index].deletedAt = new Date().toISOString()
  writeData(filename, items)
  return items[index]
}

// Restore from trash
export function restoreItem(filename: string, id: string) {
  const items = readData(filename)
  const index = items.findIndex((item: any) => item.id === id)
  if (index === -1) return null
  items[index].deleted = false
  items[index].deletedAt = null
  writeData(filename, items)
  return items[index]
}

// Permanently delete
export function permanentDelete(filename: string, id: string) {
  const items = readData(filename)
  const filtered = items.filter((item: any) => item.id !== id)
  writeData(filename, filtered)
  return true
}

// Get single item
export function getItem(filename: string, id: string) {
  const items = readData(filename)
  return items.find((item: any) => item.id === id) || null
}