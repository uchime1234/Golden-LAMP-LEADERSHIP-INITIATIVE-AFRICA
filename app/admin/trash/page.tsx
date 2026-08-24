 
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Trash2, 
  RefreshCw, 
  RotateCcw,
  AlertCircle,
  X
} from 'lucide-react'

export default function AdminTrash() {
  const [trashItems, setTrashItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchTrash()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/admin/session')
    const data = await res.json()
    if (!data.authenticated) {
      router.push('/admin/login')
    }
  }

  const fetchTrash = async () => {
    try {
      const res = await fetch('/api/content/trash')
      const data = await res.json()
      setTrashItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch trash')
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (id: string, type: string) => {
    try {
      const res = await fetch(`/api/content/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' })
      })
      if (res.ok) {
        fetchTrash()
      }
    } catch (error) {
      console.error('Failed to restore')
    }
  }

  const handlePermanentDelete = async (id: string, type: string) => {
    if (!confirm('⚠️ Are you sure you want to permanently delete this item? This cannot be undone!')) {
      return
    }
    try {
      const res = await fetch(`/api/content/${type}/${id}?permanent=true`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchTrash()
      }
    } catch (error) {
      console.error('Failed to delete permanently')
    }
  }

  const handleEmptyTrash = async () => {
    if (!confirm('⚠️ Are you sure you want to permanently delete ALL items in trash? This cannot be undone!')) {
      return
    }
    try {
      const res = await fetch('/api/content/trash', {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchTrash()
      }
    } catch (error) {
      console.error('Failed to empty trash')
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--gold)',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '24px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/admin" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Trash</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={fetchTrash}
              style={{
                padding: '8px 16px',
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px'
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            {trashItems.length > 0 && (
              <button
                onClick={handleEmptyTrash}
                style={{
                  padding: '8px 16px',
                  background: '#dc2626',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px'
                }}
              >
                <X size={16} />
                Empty Trash
              </button>
            )}
          </div>
        </div>

        {trashItems.length === 0 ? (
          <div style={{
            background: 'var(--white)',
            padding: '60px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{ font: '400 24px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Trash is Empty</h3>
            <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Deleted items will appear here for 30 days before auto-cleanup</p>
          </div>
        ) : (
          <div style={{
            background: 'var(--white)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              padding: '12px 20px',
              background: '#fef2f2',
              borderBottom: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} color="#dc2626" />
              <span style={{ fontSize: '13px', color: '#dc2626' }}>
                {trashItems.length} item{trashItems.length > 1 ? 's' : ''} in trash. Items auto-delete after 30 days.
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Deleted At</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trashItems.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500 }}>{item.title || item.name}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>
                      <span style={{
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        background: 'rgba(102, 114, 134, 0.1)',
                        color: 'var(--muted)'
                      }}>
                        {item.type || 'Unknown'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '13px' }}>
                      {item.deletedAt ? new Date(item.deletedAt).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleRestore(item.id, item.type || 'events')}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <RotateCcw size={14} />
                          Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(item.id, item.type || 'events')}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(220, 38, 38, 0.05)',
                            border: '1px solid rgba(220, 38, 38, 0.2)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={14} />
                          Delete Permanently
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}