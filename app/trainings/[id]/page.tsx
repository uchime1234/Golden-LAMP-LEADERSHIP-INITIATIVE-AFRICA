'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Calendar, 
  Award, 
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { CTA, Footer, Header, SectionHeading } from '@/components/gllia-site'
import RegistrationForm from '@/components/forms/RegistrationForm'

export default function TrainingDetailPage({ params }: { params: { id: string } }) {
  const [training, setTraining] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchTraining()
  }, [params.id])

  const fetchTraining = async () => {
    try {
      const res = await fetch(`/api/content/trainings/${params.id}`)
      const data = await res.json()
      setTraining(data)
    } catch (error) {
      console.error('Failed to fetch training:', error)
    } finally {
      setLoading(false)
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

  if (!training) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)' }}>Training Not Found</h2>
          <Link href="/trainings" className="button button-gold" style={{ marginTop: '16px', display: 'inline-block' }}>
            Back to Trainings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero training-hero" style={{
          backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('${training.image || '/training1.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container">
            <div style={{ maxWidth: '700px' }}>
              <span className="eyebrow eyebrow-light">{training.eyebrow || 'Training Program'}</span>
              <h1 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontFamily: 'Georgia, serif', fontWeight: 400, margin: '12px 0' }}>
                {training.title}
              </h1>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c5d1df' }}>
                  <Clock size={18} /> {training.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c5d1df' }}>
                  <Users size={18} /> {training.cohort || 'Cohort 1'}
                </span>
                {training.status === 'closed' && (
                  <span style={{
                    padding: '4px 16px',
                    borderRadius: '20px',
                    background: 'rgba(220, 38, 38, 0.2)',
                    color: '#dc2626',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}>CLOSED</span>
                )}
                {training.status === 'open' && (
                  <span style={{
                    padding: '4px 16px',
                    borderRadius: '20px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}>OPEN</span>
                )}
              </div>
              <p style={{ fontSize: '18px', color: '#e2e9f2', lineHeight: '1.7', marginBottom: '24px' }}>
                {training.description}
              </p>
              {/* ✅ REGISTER BUTTON - Added here */}
              {training.status !== 'closed' && (
                <button
                  onClick={() => setShowRegistration(true)}
                  className="button button-gold"
                  style={{
                    padding: '14px 32px',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  📝 Register Now
                </button>
              )}
              {training.status === 'closed' && (
                <span style={{
                  padding: '12px 24px',
                  background: 'rgba(220, 38, 38, 0.15)',
                  color: '#dc2626',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  display: 'inline-block'
                }}>
                  Registration is currently closed
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="page-content" style={{ padding: '60px 0' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <SectionHeading 
                eyebrow="Programme Overview" 
                title="What You'll Learn" 
                copy={training.expanded?.overview || 'Detailed programme information coming soon.'}
              />

              <div style={{ marginTop: '40px' }}>
                <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', marginBottom: '16px' }}>
                  Key Topics Covered
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  {training.expanded?.topics?.map((topic: string, index: number) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      background: 'var(--cream)',
                      borderRadius: '8px',
                      border: '1px solid var(--border)'
                    }}>
                      <BookOpen size={18} color="var(--gold)" />
                      <span style={{ fontSize: '14px', color: 'var(--primary)' }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {training.expanded?.testimonial && (
                <div style={{
                  marginTop: '40px',
                  padding: '24px 32px',
                  background: 'var(--cream)',
                  borderRadius: '12px',
                  borderLeft: '4px solid var(--gold)'
                }}>
                  <p style={{ fontStyle: 'italic', fontSize: '16px', color: 'var(--primary)', lineHeight: '1.7', margin: 0 }}>
                    "{training.expanded.testimonial}"
                  </p>
                  {training.expanded?.source && (
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
                      {training.expanded.source}
                    </p>
                  )}
                </div>
              )}

              {training.expanded?.highlight && (
                <div style={{
                  marginTop: '24px',
                  padding: '16px 20px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <p style={{ fontSize: '15px', color: 'var(--primary)', margin: 0 }}>
                    💡 {training.expanded.highlight}
                  </p>
                </div>
              )}

              {training.expanded?.date && (
                <div style={{
                  marginTop: '24px',
                  padding: '16px 20px',
                  background: 'var(--cream)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Calendar size={20} color="var(--gold)" />
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {training.expanded.date}
                  </span>
                  {training.expanded?.partner && (
                    <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                      | In collaboration with {training.expanded.partner}
                    </span>
                  )}
                </div>
              )}

              {/* ✅ REGISTER BUTTON - Bottom of page */}
              {training.status !== 'closed' && (
                <div style={{
                  marginTop: '40px',
                  padding: '32px',
                  background: 'var(--cream)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid var(--border)'
                }}>
                  <h3 style={{ font: '400 24px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>
                    Ready to join this training?
                  </h3>
                  <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
                    Register now to secure your spot in {training.title}
                  </p>
                  <button
                    onClick={() => setShowRegistration(true)}
                    className="button button-gold"
                    style={{
                      padding: '14px 40px',
                      fontSize: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    📝 Register Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <CTA title="Make your next move a meaningful one." button="Talk to our team"/>
      <Footer />

      {/* ✅ REGISTRATION FORM MODAL */}
      <RegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        trainingId={training.id}
        trainingTitle={training.title}
      />
    </>
  )
}