'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  X,
  GripVertical,
  Eye
} from 'lucide-react'

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date'
  required: boolean
  options?: string[]
}

// ✅ FIX: Use Promise for params
export default function AdminFormBuilder({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [fields, setFields] = useState<FormField[]>([])
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddField, setShowAddField] = useState(false)
  const [newField, setNewField] = useState<Partial<FormField>>({
    label: '',
    type: 'text',
    required: false,
    options: []
  })
  const [newOption, setNewOption] = useState('')
  const [responseCount, setResponseCount] = useState(0)
  const [responses, setResponses] = useState<any[]>([])
  const [trainingId, setTrainingId] = useState<string>('')
  const router = useRouter()

  // ✅ FIX: Unwrap params with useEffect
  useEffect(() => {
    async function unwrapParams() {
      const { id } = await params
      setTrainingId(id)
      fetchForm(id)
      fetchResponses(id)
    }
    unwrapParams()
  }, [params])

  const fetchForm = async (id: string) => {
    try {
      const res = await fetch(`/api/content/trainings/${id}/form`)
      const data = await res.json()
      if (data.fields) {
        setFields(data.fields)
        setActive(data.active !== false)
      }
    } catch (error) {
      console.error('Failed to fetch form:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchResponses = async (id: string) => {
    try {
      const res = await fetch(`/api/content/trainings/${id}/responses`)
      const data = await res.json()
      setResponseCount(data.count || 0)
      setResponses(data.responses || [])
    } catch (error) {
      console.error('Failed to fetch responses:', error)
    }
  }

  const handleAddField = () => {
    if (!newField.label) return
    
    const field: FormField = {
      id: `field_${Date.now()}`,
      label: newField.label,
      type: newField.type as FormField['type'],
      required: newField.required || false,
      options: newField.options?.filter(o => o.trim()) || []
    }
    
    setFields([...fields, field])
    setNewField({ label: '', type: 'text', required: false, options: [] })
    setShowAddField(false)
  }

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(f => f.id !== id))
  }

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= fields.length) return
    
    const newFields = [...fields]
    const temp = newFields[index]
    newFields[index] = newFields[newIndex]
    newFields[newIndex] = temp
    setFields(newFields)
  }

  const handleAddOption = () => {
    if (!newOption.trim()) return
    setNewField({
      ...newField,
      options: [...(newField.options || []), newOption.trim()]
    })
    setNewOption('')
  }

  const handleRemoveOption = (index: number) => {
    setNewField({
      ...newField,
      options: (newField.options || []).filter((_, i) => i !== index)
    })
  }

  const handleSave = async () => {
    if (!trainingId) return
    setSaving(true)
    try {
      const res = await fetch(`/api/content/trainings/${trainingId}/form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, active })
      })
      if (res.ok) {
        alert('Form saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save form:', error)
      alert('Failed to save form')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadCSV = () => {
    if (!trainingId) return
    window.open(`/api/content/trainings/${trainingId}/responses?format=csv`)
  }

  const getFieldTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      text: 'Text',
      email: 'Email',
      phone: 'Phone',
      textarea: 'Text Area',
      select: 'Dropdown',
      checkbox: 'Checkbox',
      radio: 'Radio',
      date: 'Date'
    }
    return map[type] || type
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/admin/trainings" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Manage Registration Form</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
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
              fontSize: '14px',
              opacity: saving ? 0.7 : 1
            }}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Form'}
          </button>
        </div>

        {/* Form Status */}
        <div style={{
          background: 'var(--white)',
          padding: '16px 20px',
          borderRadius: '12px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Form Status:</span>
          <button
            onClick={() => setActive(!active)}
            style={{
              padding: '4px 16px',
              borderRadius: '20px',
              border: 'none',
              background: active ? 'rgba(34, 197, 94, 0.15)' : 'rgba(220, 38, 38, 0.15)',
              color: active ? '#22c55e' : '#dc2626',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {active ? '✅ Active' : '⏸️ Inactive'}
          </button>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            {active ? 'Form is visible to users' : 'Form is hidden from users'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Form Builder */}
          <div style={{
            background: 'var(--white)',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Form Fields</h2>
              <button
                onClick={() => setShowAddField(!showAddField)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  color: 'var(--gold)',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} /> Add Field
              </button>
            </div>

            {/* Add Field Form */}
            {showAddField && (
              <div style={{
                background: 'var(--cream)',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                      Field Label *
                    </label>
                    <input
                      type="text"
                      value={newField.label}
                      onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                      placeholder="e.g., Full Name"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                      Field Type
                    </label>
                    <select
                      value={newField.type}
                      onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="textarea">Text Area</option>
                      <option value="select">Dropdown</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio</option>
                      <option value="date">Date</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                    <input
                      type="checkbox"
                      checked={newField.required || false}
                      onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                      style={{ marginRight: '8px' }}
                    />
                    Required Field
                  </label>
                </div>

                {(newField.type === 'select' || newField.type === 'radio') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                      Options
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add option..."
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                      />
                      <button
                        onClick={handleAddOption}
                        style={{
                          padding: '8px 16px',
                          background: 'var(--gold)',
                          color: 'var(--primary)',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                      {(newField.options || []).map((opt, idx) => (
                        <span key={idx} style={{
                          background: 'var(--white)',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          border: '1px solid var(--border)'
                        }}>
                          {opt}
                          <button
                            onClick={() => handleRemoveOption(idx)}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 0 }}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleAddField}
                    style={{
                      padding: '8px 20px',
                      background: 'var(--gold)',
                      color: 'var(--primary)',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Add Field
                  </button>
                  <button
                    onClick={() => {
                      setShowAddField(false)
                      setNewField({ label: '', type: 'text', required: false, options: [] })
                    }}
                    style={{
                      padding: '8px 20px',
                      background: 'transparent',
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Field List */}
            {fields.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>📝</div>
                <p>No fields added yet. Click "Add Field" to start building your form.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {fields.map((field, index) => (
                  <div key={field.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'var(--cream)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}>
                    <span style={{ color: 'var(--muted)', cursor: 'grab' }}>
                      <GripVertical size={16} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 600 }}>{field.label}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: '8px' }}>
                        {getFieldTypeLabel(field.type)}
                        {field.required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => handleMoveField(index, 'up')}
                        disabled={index === 0}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--muted)',
                          opacity: index === 0 ? 0.3 : 1
                        }}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMoveField(index, 'down')}
                        disabled={index === fields.length - 1}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--muted)',
                          opacity: index === fields.length - 1 ? 0.3 : 1
                        }}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleRemoveField(field.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#dc2626'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Responses Summary */}
          <div style={{
            background: 'var(--white)',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            alignSelf: 'start'
          }}>
            <h2 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0 0 16px 0' }}>
              📊 Responses
            </h2>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--primary)' }}>
                {responseCount}
              </div>
              <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Total Responses</p>
            </div>
            
            {responseCount > 0 && (
              <>
                <button
                  onClick={handleDownloadCSV}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}
                >
                  📥 Download CSV
                </button>
                <Link
                  href={`/admin/trainings/${trainingId}/responses`}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: 'var(--gold)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '14px',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                >
                  👁️ View All Responses
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}