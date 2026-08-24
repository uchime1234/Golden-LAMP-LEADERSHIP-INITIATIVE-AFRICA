'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  BookOpen, 
  Users, 
  UserCircle, 
  MessageSquare, 
  Trash2,
  LogOut,
  ArrowRight,
  RefreshCw
} from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    events: 0,
    trainings: 0,
    team: 0,
    mentors: 0,
    testimonials: 0,
    trash: 0
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/session')
      const data = await res.json()
      if (!data.authenticated) {
        router.push('/admin/login')
      } else {
        setAuthenticated(true)
        fetchStats()
      }
    } catch (error) {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    const sections = ['events', 'trainings', 'team', 'mentors', 'testimonials']
    for (const section of sections) {
      try {
        const res = await fetch(`/api/content/${section}`)
        const data = await res.json()
        if (Array.isArray(data)) {
          const active = data.filter((item: any) => !item.deleted)
          setStats(prev => ({ ...prev, [section]: active.length }))
        }
      } catch (error) {
        console.error(`Failed to fetch ${section}`)
      }
    }
    try {
      const res = await fetch('/api/content/trash')
      const data = await res.json()
      setStats(prev => ({ ...prev, trash: data?.length || 0 }))
    } catch (error) {
      console.error('Failed to fetch trash')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--cream)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid var(--gold)',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!authenticated) return null

  const sections = [
    { name: 'Events', icon: Calendar, count: stats.events, href: '/admin/events', color: '#d4af37' },
    { name: 'Trainings', icon: BookOpen, count: stats.trainings, href: '/admin/trainings', color: '#1a2a4a' },
    { name: 'Team', icon: Users, count: stats.team, href: '/admin/team', color: '#2c3e6b' },
    { name: 'Mentors', icon: UserCircle, count: stats.mentors, href: '/admin/mentors', color: '#667286' },
    { name: 'Testimonials', icon: MessageSquare, count: stats.testimonials, href: '/admin/testimonials', color: '#c9a84c' },
    { name: 'Trash', icon: Trash2, count: stats.trash, href: '/admin/trash', color: '#dc2626' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cream)'
    }}>
      <header style={{
        background: 'var(--primary)',
        color: 'var(--white)',
        padding: '20px 0',
        borderBottom: '2px solid var(--gold)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px', color: 'var(--gold)' }}>✦</span>
            <span style={{ fontSize: '20px', fontWeight: 600 }}>GLLIA Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={fetchStats}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'var(--white)',
                padding: '8px 12px',
                borderRadius: '6px',
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
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(220, 38, 38, 0.2)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                color: 'var(--white)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px'
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            font: '400 32px Georgia, serif',
            color: 'var(--primary)',
            margin: 0
          }}>Dashboard</h1>
          <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Manage your website content</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              style={{
                background: 'var(--white)',
                padding: '20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <section.icon size={20} color={section.color} />
                <span style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--primary)'
                }}>{section.count}</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: 'var(--muted)',
                marginTop: '8px'
              }}>{section.name}</div>
              <ArrowRight size={14} style={{
                color: 'var(--gold)',
                marginTop: '8px'
              }} />
            </Link>
          ))}
        </div>

        <div style={{
          background: 'var(--white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{
            font: '400 18px Georgia, serif',
            color: 'var(--primary)',
            margin: '0 0 16px 0'
          }}>Quick Actions</h3>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Link href="/admin/events" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'rgba(212, 175, 55, 0.1)',
              color: 'var(--gold)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500
            }}>Add Event</Link>
            <Link href="/admin/trainings" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'rgba(26, 42, 74, 0.05)',
              color: 'var(--primary)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500
            }}>Add Training</Link>
            <Link href="/admin/team" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'rgba(26, 42, 74, 0.05)',
              color: 'var(--primary)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500
            }}>Add Team Member</Link>
            <Link href="/admin/mentors" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'rgba(26, 42, 74, 0.05)',
              color: 'var(--primary)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500
            }}>Add Mentor</Link>
          </div>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px 20px',
          background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <Link href="/" target="_blank" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--gold)',
            textDecoration: 'none',
            fontWeight: 500
          }}>
            View Website <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}