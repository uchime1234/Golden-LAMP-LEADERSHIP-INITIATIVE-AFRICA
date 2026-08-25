// lib/cache.js
// Simple in-memory cache

const cache = new Map()
const CACHE_DURATION = 30 * 1000 // 30 seconds

export function getCached(key) {
  const cached = cache.get(key)
  if (!cached) return null
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(key)
    return null
  }
  return cached.data
}

export function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

export function clearCache() {
  cache.clear()
}

export function invalidateCache(key) {
  cache.delete(key)
}