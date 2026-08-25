"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  Users,
  Award,
  Mail,
  Phone,
  User,
  FileText,
  XCircle
} from 'lucide-react'
import { Header, Footer } from '@/components/gllia-site'

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date'
  required: boolean
  options?: string[]
  placeholder?: string
}

interface TrainingData {
  id: string
  title: string
  description: string
  duration: string
  status: string
  image: string
  cohort?: string
  expanded?: {
    overview: string
    topics: string[]
    testimonial?: string
    source?: string
    highlight?: string
    date?: string
    partner?: string
    goals?: string[]
  }
}

interface FormData {
  id: string
  training_id: string
  fields: FormField[]
  active: boolean
}

// Helper to get icon for field type
const getFieldIcon = (type: string) => {
  switch(type) {
    case 'email': return <Mail size={16} />
    case 'phone': return <Phone size={16} />
    case 'text': return <User size={16} />
    case 'textarea': return <FileText size={16} />
    default: return null
  }
}

export default function RegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const trainingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [training, setTraining] = useState<TrainingData | null>(null)
  const [form, setForm] = useState<FormData | null>(null)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Fetch training and form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch training details
        const trainingRes = await fetch(`/api/content/trainings/${trainingId}`)
        if (!trainingRes.ok) {
          throw new Error('Training not found')
        }
        const trainingData = await trainingRes.json()
        setTraining(trainingData)

        // Fetch form configuration
        const formRes = await fetch(`/api/content/trainings/${trainingId}/form`)
        
        if (formRes.ok) {
          const formData = await formRes.json()
          
          if (formData && formData.active !== false) {
            if (formData.fields && Array.isArray(formData.fields) && formData.fields.length > 0) {
              setForm(formData)
              const initialValues: Record<string, any> = {}
              formData.fields.forEach((field: FormField) => {
                initialValues[field.label] = ''
              })
              setFormValues(initialValues)
            } else {
              setError('This training has a form but no fields have been added yet. Please contact the administrator.')
            }
          } else {
            setError('Registration is currently closed for this training.')
          }
        } else {
          setError('No registration form available for this training.')
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load registration form')
      } finally {
        setLoading(false)
      }
    }

    if (trainingId) {
      fetchData()
    }
  }, [trainingId])

  // Handle form field changes
  const handleFieldChange = (fieldLabel: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldLabel]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      // Validate required fields
      for (const field of form?.fields || []) {
        if (field.required && !formValues[field.label]) {
          setSubmitError(`Please fill in "${field.label}"`)
          setSubmitting(false)
          return
        }
      }

      // Submit response
      const res = await fetch('/api/content/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainingId: trainingId,
          formId: form?.id,
          data: formValues
        })
      })

      if (res.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const data = await res.json()
        setSubmitError(data.error || 'Failed to submit registration. Please try again.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="container" style={{ 
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px'
        }}>
          <Loader2 size={48} style={{ color: 'var(--gold)', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '16px', color: 'var(--muted)' }}>Loading registration form...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
        <Footer />
      </>
    )
  }

  // Error state (no form, closed, or no fields)
  if (error || !form) {
    return (
      <>
        <Header />
        <div className="container" style={{ 
          minHeight: '60vh',
          padding: '60px 20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            {error?.includes('closed') ? (
              <XCircle size={64} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            ) : (
              <AlertCircle size={64} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            )}
            <h2 style={{ 
              font: '400 28px Georgia, serif', 
              color: 'var(--primary)',
              margin: '0 0 12px'
            }}>
              {error?.includes('closed') ? 'Registration Closed' : 'Registration Unavailable'}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
              {error || 'No registration form is available for this training.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/trainings" className="button button-gold">
                <ArrowLeft size={16} />
                Back to Trainings
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Check if form has fields
  if (!form.fields || form.fields.length === 0) {
    return (
      <>
        <Header />
        <div className="container" style={{ 
          minHeight: '60vh',
          padding: '60px 20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <AlertCircle size={64} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ 
              font: '400 28px Georgia, serif', 
              color: 'var(--primary)',
              margin: '0 0 12px'
            }}>
              Form Not Ready
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>
              This training has a form but no fields have been added yet.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
              Please check back later or contact the administrator.
            </p>
            <Link href="/trainings" className="button button-gold">
              <ArrowLeft size={16} />
              Back to Trainings
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Success state (submitted)
  if (submitted) {
    return (
      <>
        <Header />
        <div className="container" style={{ 
          minHeight: '60vh',
          padding: '60px 20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <CheckCircle size={64} color="var(--gold)" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ 
              font: '400 28px Georgia, serif', 
              color: 'var(--primary)',
              margin: '0 0 12px'
            }}>
              Registration Successful! 🎉
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '8px' }}>
              Thank you for registering for <strong>{training?.title}</strong>.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
              A confirmation email has been sent to your email address with further details.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/trainings" className="button button-gold">
                View All Trainings <ArrowRight size={16} />
              </Link>
              <Link href="/" className="button" style={{ 
                background: 'transparent', 
                border: '1px solid var(--border)',
                color: 'var(--primary)'
              }}>
                Return Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Render registration form
  return (
    <>
      <Header />
      
      {/* Page Header */}
      <section style={{
        background: 'var(--primary)',
        color: 'var(--white)',
        padding: '60px 0',
        borderBottom: '3px solid var(--gold)'
      }}>
        <div className="container">
          <Link 
            href="/trainings" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={16} />
            Back to Trainings
          </Link>
          
          <h1 style={{ 
            font: '400 clamp(32px, 4vw, 48px) Georgia, serif',
            margin: '0 0 8px',
            color: 'var(--white)'
          }}>
            {training?.title}
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#c5d1df',
            maxWidth: '600px'
          }}>
            Complete the form below to register for this training program.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section style={{
        padding: '60px 0',
        background: 'var(--cream)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Training Info Sidebar */}
            <div style={{
              background: 'var(--white)',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: '24px'
            }}>
              {training?.image && (
                <img 
                  src={training.image} 
                  alt={training.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
              )}
              
              <h3 style={{
                font: '400 20px Georgia, serif',
                color: 'var(--primary)',
                margin: '0 0 12px'
              }}>
                Program Details
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {training?.duration && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={18} color="var(--gold)" />
                    <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                      <strong>Duration:</strong> {training.duration}
                    </span>
                  </div>
                )}
                
                {training?.cohort && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={18} color="var(--gold)" />
                    <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                      <strong>Cohort:</strong> {training.cohort}
                    </span>
                  </div>
                )}
                
                {training?.expanded?.date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={18} color="var(--gold)" />
                    <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                      <strong>Date:</strong> {training.expanded.date}
                    </span>
                  </div>
                )}
                
                {training?.expanded?.partner && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={18} color="var(--gold)" />
                    <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                      <strong>Partner:</strong> {training.expanded.partner}
                    </span>
                  </div>
                )}
              </div>
              
              {training?.expanded?.overview && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <h4 style={{ 
                    font: '600 14px Georgia, serif',
                    color: 'var(--primary)',
                    margin: '0 0 8px'
                  }}>
                    About This Program
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>
                    {training.expanded.overview}
                  </p>
                </div>
              )}
              
              {training?.status && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: training.status === 'open' ? 'rgba(34, 197, 94, 0.15)' : 
                              training.status === 'upcoming' ? 'rgba(212, 175, 55, 0.15)' : 
                              'rgba(220, 38, 38, 0.15)',
                    color: training.status === 'open' ? '#22c55e' : 
                           training.status === 'upcoming' ? 'var(--gold)' : '#dc2626'
                  }}>
                    {training.status === 'open' ? 'Open for Registration' : 
                     training.status === 'upcoming' ? 'Coming Soon' : 'Closed'}
                  </span>
                </div>
              )}
            </div>

            {/* Registration Form */}
            <div style={{
              background: 'var(--white)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{
                font: '400 24px Georgia, serif',
                color: 'var(--primary)',
                margin: '0 0 8px'
              }}>
                Registration Form
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
                Please fill in all required fields marked with <span style={{ color: '#dc2626' }}>*</span>
              </p>

              {submitError && (
                <div style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={18} />
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {form.fields.map((field, index) => (
                  <div key={field.id || index} style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      marginBottom: '6px'
                    }}>
                      {field.label || `Field ${index + 1}`}
                      {field.required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
                    </label>

                    {/* Text Input */}
                    {(field.type === 'text' || field.type === 'email' || field.type === 'phone') && (
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--muted)',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {getFieldIcon(field.type)}
                        </div>
                        <input
                          type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                          value={formValues[field.label] || ''}
                          onChange={(e) => handleFieldChange(field.label, e.target.value)}
                          placeholder={field.placeholder || `Enter your ${field.label?.toLowerCase() || 'answer'}`}
                          required={field.required}
                          style={{
                            width: '100%',
                            padding: '10px 14px 10px 38px',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '15px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            background: 'var(--white)'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                        />
                      </div>
                    )}

                    {/* Textarea */}
                    {field.type === 'textarea' && (
                      <textarea
                        value={formValues[field.label] || ''}
                        onChange={(e) => handleFieldChange(field.label, e.target.value)}
                        placeholder={field.placeholder || `Enter your ${field.label?.toLowerCase() || 'answer'}`}
                        rows={4}
                        required={field.required}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '15px',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border-color 0.2s',
                          background: 'var(--white)',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                      />
                    )}

                    {/* Select Dropdown */}
                    {field.type === 'select' && field.options && (
                      <select
                        value={formValues[field.label] || ''}
                        onChange={(e) => handleFieldChange(field.label, e.target.value)}
                        required={field.required}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          background: 'var(--white)',
                          appearance: 'auto'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Checkbox */}
                    {field.type === 'checkbox' && (
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        color: 'var(--primary)',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="checkbox"
                          checked={formValues[field.label] || false}
                          onChange={(e) => handleFieldChange(field.label, e.target.checked)}
                          required={field.required}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: 'var(--gold)',
                            cursor: 'pointer'
                          }}
                        />
                        {field.label}
                      </label>
                    )}

                    {/* Radio Buttons */}
                    {field.type === 'radio' && field.options && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {field.options.map((option) => (
                          <label key={option} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            color: 'var(--primary)',
                            cursor: 'pointer'
                          }}>
                            <input
                              type="radio"
                              name={field.id}
                              value={option}
                              checked={formValues[field.label] === option}
                              onChange={(e) => handleFieldChange(field.label, e.target.value)}
                              required={field.required}
                              style={{
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--gold)',
                                cursor: 'pointer'
                              }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Date Input */}
                    {field.type === 'date' && (
                      <input
                        type="date"
                        value={formValues[field.label] || ''}
                        onChange={(e) => handleFieldChange(field.label, e.target.value)}
                        required={field.required}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          background: 'var(--white)',
                          colorScheme: 'light'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                      />
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                <div style={{ marginTop: '8px' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      background: 'var(--gold)',
                      color: 'var(--primary)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 700,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      opacity: submitting ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.background = '#b8962e'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.background = 'var(--gold)'
                      }
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Registration <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>

                <p style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  textAlign: 'center',
                  marginTop: '12px'
                }}>
                  By submitting this form, you agree to our privacy policy and terms of service.
                  A confirmation email will be sent to your provided email address.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}