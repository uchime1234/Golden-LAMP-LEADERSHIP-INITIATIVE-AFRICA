 
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  Upload,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react'

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    status: 'upcoming'
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchEvents()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/admin/session')
    const data = await res.json()
    if (!data.authenticated) {
      router.push('/admin/login')
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/content/events')
      const data = await res.json()
      setEvents(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let imageUrl = formData.image
      
      // Upload image if selected
      if (imageFile) {
        const form = new FormData()
        form.append('file', imageFile)
        form.append('type', 'events')
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: form
        })
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json()
          imageUrl = uploadData.url
        }
      }

      const payload = { ...formData, image: imageUrl }
      
      let url = '/api/content/events'
      let method = 'POST'
      
      if (editingId) {
        url = `/api/content/events/${editingId}`
        method = 'PUT'
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        resetForm()
        fetchEvents()
      }
    } catch (error) {
      console.error('Failed to save event')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (event: any) => {
    setEditingId(event.id)
    setFormData({
      title: event.title || '',
      date: event.date || '',
      location: event.location || '',
      description: event.description || '',
      image: event.image || '',
      status: event.status || 'upcoming'
    })
    setImagePreview(event.image || null)
    setShowForm(true)
  }

  const handleDelete = async (id: string, permanent = false) => {
    if (!confirm(`Are you sure you want to ${permanent ? 'permanently delete' : 'move to trash'} this event?`)) {
      return
    }

    try {
      const res = await fetch(`/api/content/events/${id}?permanent=${permanent}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchEvents()
      }
    } catch (error) {
      console.error('Failed to delete event')
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/content/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' })
      })
      if (res.ok) {
        fetchEvents()
      }
    } catch (error) {
      console.error('Failed to restore event')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      image: '',
      status: 'upcoming'
    })
    setImageFile(null)
    setImagePreview(null)
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
            <h1 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Manage Events</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'var(--gold)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{
            background: 'var(--white)',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: 0 }}>
                {editingId ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button onClick={resetForm} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                    Date *
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., 30 October 2026"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Ibadan, Nigeria"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  required
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                  Event Image
                </label>
                <div style={{
                  border: '2px dashed var(--border)',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    {imagePreview ? (
                      <div style={{ position: 'relative' }}>
                        <img src={imagePreview} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '8px' }} />
                        <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--muted)' }}>Click to change</div>
                      </div>
                    ) : (
                      <div>
                        <Upload size={32} color="var(--muted)" style={{ margin: '0 auto' }} />
                        <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--muted)' }}>Click to upload image</div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '10px 24px',
                    background: 'var(--gold)',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: saving ? 0.7 : 1
                  }}
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Event'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '10px 24px',
                    background: 'transparent',
                    color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          {events.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📅</div>
              <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: 0 }}>No Events Yet</h3>
              <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Click "Add Event" to create your first event</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Image</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Title</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      {event.image ? (
                        <img src={event.image} alt={event.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                      ) : (
                        <div style={{ width: '50px', height: '50px', background: 'var(--cream)', borderRadius: '6px' }} />
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 500 }}>{event.title}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{event.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: event.status === 'upcoming' ? 'rgba(212, 175, 55, 0.15)' : 
                                  event.status === 'active' ? 'rgba(34, 197, 94, 0.15)' : 
                                  event.status === 'closed' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(102, 114, 134, 0.15)',
                        color: event.status === 'upcoming' ? 'var(--gold)' : 
                               event.status === 'active' ? '#22c55e' : 
                               event.status === 'closed' ? '#dc2626' : 'var(--muted)'
                      }}>
                        {event.status || 'upcoming'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleEdit(event)}
                          style={{
                            padding: '6px 12px',
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        {event.deleted ? (
                          <button
                            onClick={() => handleRestore(event.id)}
                            style={{
                              padding: '6px 12px',
                              background: 'rgba(34, 197, 94, 0.1)',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              color: '#22c55e'
                            }}
                          >
                            Restore
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(event.id)}
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
                            Trash
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}