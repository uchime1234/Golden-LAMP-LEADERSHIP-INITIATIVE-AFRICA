"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Calendar,
  Award,
  BookOpen,
  BarChart,
  FileText,
  Search,
  Database,
  TrendingUp,
  PenTool,
  Users as UsersIcon
} from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<any[]>([])
  const [expandedTraining, setExpandedTraining] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch('/api/content/trainings')
        const data = await res.json()
        setTrainings(data.filter((t: any) => !t.deleted))
      } catch (error) {
        console.error('Failed to fetch trainings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrainings()
  }, [])

  const toggleTraining = (index: number) => {
    setExpandedTraining(expandedTraining === index ? null : index)
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
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="page-hero training-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('/training1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container">
            <span className="eyebrow eyebrow-light">GLLIA Learning Lab</span>
            <h1>Learn with purpose. Lead with confidence.</h1>
            <p>Flexible learning experiences for people ready to turn insight into better health outcomes.</p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content">
          <div className="container">
            <SectionHeading eyebrow="Featured learning" title="Practical skills for complex work." />

            <div className="training-grid-vertical">
              {trainings.map((training: any, index: number) => (
                <div key={training.id} className="training-card-vertical" onClick={() => toggleTraining(index)}>
                  <div className="training-card-header">
                    <div className="training-card-image" style={{ backgroundImage: `url('${training.image}')` }} />
                    <div className="training-card-info">
                      <span className="eyebrow">{training.eyebrow}</span>
                      <h3>{training.title}</h3>
                      <p>{training.description}</p>
                      <div className="training-meta">
                        <span><Clock size={14}/> {training.duration}</span>
                        <span><Users size={14}/> {training.cohort || 'Cohort 1'}</span>
                        {/* ✅ STATUS BADGE */}
                        {training.status === 'closed' && (
                          <span className="status-badge closed">CLOSED</span>
                        )}
                        {training.status === 'open' && (
                          <span className="status-badge open">OPEN</span>
                        )}
                        {training.status === 'upcoming' && (
                          <span className="status-badge upcoming">UPCOMING</span>
                        )}
                      </div>
                    </div>
                    <div className="training-expand-icon">
                      {expandedTraining === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>

                  {expandedTraining === index && (
                    <div className="training-expanded-content">
                      <div className="training-expanded-inner">
                        <h4>Programme Overview</h4>
                        <p>{training.expanded?.overview}</p>

                        <h5>What You'll Learn</h5>
                        <ul>
                          {training.expanded?.topics && training.expanded.topics.map((topic: string, i: number) => {
                            const IconMap: any = {
                              'Research Design': Search,
                              'Excel for Research': BarChart,
                              'Data Analysis using SPSS': Database,
                              'Systematic Reviews': FileText,
                              'AI-Assisted Research Writing': PenTool,
                              'Research and Academic Writing': BookOpen,
                              'Professional Development and Leadership': TrendingUp,
                              'Connecting with Experienced Professionals and Researchers': UsersIcon,
                              'Identifying a problem': TrendingUp,
                              'Developing a research question': Search,
                              'Research design': BookOpen,
                              'Literature review': FileText,
                              'Data collection': Database,
                              'Analysis': BarChart,
                              'Interpretation': PenTool,
                              'Academic writing': Award,
                              'Communicating findings': UsersIcon,
                              'Strengthen clinical decision-making': Award,
                              'Apply the latest evidence in patient care': FileText,
                              'Learn from experienced healthcare professionals': UsersIcon,
                              'Earn a recognized certificate of participation': Calendar
                            }
                            const IconComponent = IconMap[topic] || BookOpen
                            return (
                              <li key={i}>
                                <IconComponent size={16} /> {topic}
                              </li>
                            )
                          })}
                        </ul>

                        {training.expanded?.goals && (
                          <>
                            <h5>Programme Goals</h5>
                            <ul>
                              {training.expanded.goals.map((goal: string, i: number) => {
                                const IconMap: any = {
                                  'Strengthen clinical decision-making': Award,
                                  'Apply the latest evidence in patient care': FileText,
                                  'Learn from experienced healthcare professionals': UsersIcon,
                                  'Earn a recognized certificate of participation': Calendar
                                }
                                const IconComponent = IconMap[goal] || BookOpen
                                return (
                                  <li key={i}>
                                    <IconComponent size={16} /> {goal}
                                  </li>
                                )
                              })}
                            </ul>
                          </>
                        )}

                        {training.expanded?.testimonial && (
                          <div className="training-testimonial">
                            <p>{training.expanded.testimonial}</p>
                            {training.expanded.source && <p className="training-source">{training.expanded.source}</p>}
                          </div>
                        )}

                        {training.expanded?.highlight && (
                          <div className="training-highlight">
                            <p>{training.expanded.highlight}</p>
                          </div>
                        )}

                        {training.expanded?.date && (
                          <div className="training-meta-info">
                            <span className="training-date">
                              <Calendar size={16} /> {training.expanded.date}
                            </span>
                            {training.expanded.partner && (
                              <span className="training-partner">{training.expanded.partner}</span>
                            )}
                          </div>
                        )}

                        {/* ✅ Only show Register button if status is NOT closed */}
                        {training.status !== 'closed' && (
                          <div className="training-cta">
                            <Link href="/contact" className="button button-gold">
                              Register interest <ArrowRight size={16}/>
                            </Link>
                          </div>
                        )}

                        {/* ✅ Show message if training is closed */}
                        {training.status === 'closed' && (
                          <div className="training-closed-message">
                            <p>This training is currently closed. Check back later for new sessions!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTA title="Make your next move a meaningful one." button="Talk to our team"/>
      <Footer />
    </>
  )
}