'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Home, Calendar, BookOpen, Users, UserCircle, MessageSquare, Trash2, Settings, Menu, X } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/admin/session')
    const data = await res.json()
    if (!data.authenticated) {
      router.push('/admin/login')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/admin' },
    { name: 'Events', icon: Calendar, href: '/admin/events' },
    { name: 'Trainings', icon: BookOpen, href: '/admin/trainings' },
    { name: 'Team', icon: Users, href: '/admin/team' },
    { name: 'Mentors', icon: UserCircle, href: '/admin/mentors' },
    { name: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials' },
    { name: 'Trash', icon: Trash2, href: '/admin/trash' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex' }}>
      {/* Sidebar - Desktop */}
      <aside style={{
        width: '240px',
        background: 'var(--primary)',
        color: 'var(--white)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <span style={{ fontSize: '24px', color: 'var(--gold)' }}>✦</span>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>GLLIA Admin</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            color: 'var(--white)',
            background: 'rgba(220, 38, 38, 0.2)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}