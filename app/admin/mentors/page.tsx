 
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  UserCircle
} from 'lucide-react'

export default function AdminMentors() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    qualification: '',
    expertise: '',
    image: '',
    category: 'mentor'
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchItems()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/admin/session')
    const data = await res.json()
    if (!data.authenticated) {
      router.push('/admin/login')
    }
  }

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/content/mentors')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch mentors')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
      if (imagePreview && imagePreview.startsWith('data:')) {
        imageUrl = imagePreview
      }

      const payload = { 
        ...formData, 
        image: imageUrl,
        expertise: formData.expertise.split(',').map((s: string) => s.trim())
      }
      
      let url = '/api/content/mentors'
      let method = 'POST'
      
      if (editingId) {
        url = `/api/content/mentors/${editingId}`
        method = 'PUT'
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        resetForm()
        fetchItems()
      }
    } catch (error) {
      console.error('Failed to save mentor')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: any) => {
    setEditingId(item.id)
    setFormData({
      name: item.name || '',
      role: item.role || '',
      qualification: item.qualification || '',
      expertise: Array.isArray(item.expertise) ? item.expertise.join(', ') : '',
      image: item.image || '',
      category: item.category || 'mentor'
    })
    setImagePreview(item.image || null)
    setShowForm(true)
  }

  const handleDelete = async (id: string, permanent = false) => {
    if (!confirm(`Are you sure you want to ${permanent ? 'permanently delete' : 'move to trash'} this mentor?`)) {
      return
    }

    try {
      const res = await fetch(`/api/content/mentors/${id}?permanent=${permanent}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchItems()
      }
    } catch (error) {
      console.error('Failed to delete mentor')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      role: '',
      qualification: '',
      expertise: '',
      image: '',
      category: 'mentor'
    })
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/admin" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Manage Mentors</h1>
          </div>
          <button onClick={() => setShowForm(true)} style={{
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
          }}>
            <Plus size={18} /> Add Mentor
          </button>
        </div>

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
                {editingId ? 'Edit Mentor' : 'Add New Mentor'}
              </h2>
              <button onClick={resetForm} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Role *</label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }} required />
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Qualification</label>
                <input type="text" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} placeholder="e.g., MSc, PhD" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }} />
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Expertise (comma separated)</label>
                <input type="text" value={formData.expertise} onChange={(e) => setFormData({ ...formData, expertise: e.target.value })} placeholder="e.g., Research, Leadership, Nursing" style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }} />
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }} />
                {imagePreview && <div style={{ marginTop: '8px' }}><img src={imagePreview} alt="Preview" style={{ maxHeight: '100px', borderRadius: '8px' }} /></div>}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button type="submit" disabled={saving} style={{
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
                }}>
                  <Save size={18} /> {saving ? 'Saving...' : 'Save Mentor'}
                </button>
                <button type="button" onClick={resetForm} style={{
                  padding: '10px 24px',
                  background: 'transparent',
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          {items.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>👤</div>
              <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: 0 }}>No Mentors Yet</h3>
              <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Click "Add Mentor" to create your first mentor</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Role</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500 }}>{item.name}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{item.role}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleEdit(item)} style={{
                          padding: '6px 12px',
                          background: 'transparent',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}><Edit size={14} /> Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={{
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
                        }}><Trash2 size={14} /> Trash</button>
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