 
'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  trainingId: string
  trainingTitle: string
}

export default function RegistrationForm({ isOpen, onClose, trainingId, trainingTitle }: RegistrationFormProps) {
  const [form, setForm] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen && trainingId) {
      fetchForm()
    }
  }, [isOpen, trainingId])

  const fetchForm = async () => {
    try {
      const res = await fetch(`/api/content/trainings/${trainingId}/form`)
      const data = await res.json()
      if (data.active !== false && data.fields) {
        setForm(data)
        // Initialize form data
        const initialData: Record<string, any> = {}
        data.fields.forEach((field: any) => {
          initialData[field.label] = ''
        })
        setFormData(initialData)
      } else {
        setError('Registration is currently closed.')
      }
    } catch (error) {
      console.error('Failed to fetch form:', error)
      setError('Failed to load registration form.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Check required fields
    for (const field of form?.fields || []) {
      if (field.required && !formData[field.label]) {
        setError(`Please fill in "${field.label}"`)
        setLoading(false)
        return
      }
    }

    try {
      const res = await fetch('/api/content/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainingId,
          formId: form.id,
          data: formData
        })
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit registration.')
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      setError('Failed to submit registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  if (submitted) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} onClick={onClose}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          textAlign: 'center'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: 0 }}>
            Registration Successful!
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: '8px' }}>
            Thank you for registering for <strong>{trainingTitle}</strong>.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={onClose}
            style={{
              marginTop: '20px',
              padding: '10px 32px',
              background: 'var(--gold)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  if (error && !form) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} onClick={onClose}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          textAlign: 'center'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
          <h3 style={{ font: '400 24px Georgia, serif', color: 'var(--primary)', margin: 0 }}>Registration Unavailable</h3>
          <p style={{ color: 'var(--muted)', marginTop: '8px' }}>{error}</p>
          <button
            onClick={onClose}
            style={{
              marginTop: '20px',
              padding: '10px 32px',
              background: 'var(--gold)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '32px',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted)'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ font: '400 24px Georgia, serif', color: 'var(--primary)', margin: '0 0 4px' }}>
          Register for {trainingTitle}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
          Fill in the form below to register.
        </p>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {form?.fields?.map((field: any) => (
            <div key={field.id} style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--primary)',
                marginBottom: '4px'
              }}>
                {field.label}
                {field.required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
              </label>

              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.label] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
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
                  required={field.required}
                />
              )}

              {field.type === 'select' && (
                <select
                  value={formData[field.label] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <input
                    type="checkbox"
                    checked={formData[field.label] || false}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.checked })}
                    required={field.required}
                  />
                  {field.label}
                </label>
              )}

              {field.type === 'radio' && field.options?.map((opt: string) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '4px' }}>
                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    checked={formData[field.label] === opt}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    required={field.required}
                  />
                  {opt}
                </label>
              ))}

              {field.type === 'date' && (
                <input
                  type="date"
                  value={formData[field.label] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required={field.required}
                />
              )}

              {(field.type === 'text' || field.type === 'email' || field.type === 'phone') && (
                <input
                  type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                  value={formData[field.label] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--gold)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  )
}