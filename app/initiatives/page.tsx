"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
  Target,
  Lightbulb,
  Award,
  GraduationCap,
  Stethoscope,
  BookOpen,
  TrendingUp,
  Star,
  Heart,
  Sparkles,
  MapPin,
  Mail
} from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function InitiativesPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [testimonialSlide, setTestimonialSlide] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content/initiatives')
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error('Failed to fetch initiatives data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (data?.testimonials) {
      const interval = setInterval(() => {
        setTestimonialSlide((prev) => (prev + 1) % data.testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [data])

  const nextTestimonial = () => {
    if (data?.testimonials) {
      setTestimonialSlide((prev) => (prev + 1) % data.testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (data?.testimonials) {
      setTestimonialSlide((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length)
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

  if (!data) return null

  const { hero1, hero2, hero3, goals, testimonials, visionMission, journey, impactStories } = data

  return (
    <>
      <Header />
      <main>
        {/* Hero 1 */}
        <section className="initiatives-hero" style={{
          backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('${hero1.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          padding: '120px 0',
          color: 'var(--white)',
          minHeight: '450px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container">
            <span className="eyebrow eyebrow-light">Our Initiatives</span>
            <h1>{hero1.title}</h1>
            <p style={{ maxWidth: '540px', fontSize: '18px', color: '#e2e9f2' }}>{hero1.description}</p>
            <div className="hero-actions">
              <Link href={hero1.buttonLink} className="button button-gold">
                {hero1.buttonText} <ArrowRight size={17}/>
              </Link>
            </div>
          </div>
        </section>

        {/* Hero 2 */}
        <section className="initiatives-hero-2" style={{
          backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.7) 50%, rgba(8,31,65,.3) 100%), url('${hero2.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
          color: 'var(--white)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container">
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 64px)', margin: 0 }}>{hero2.title}</h2>
            <p style={{ fontSize: '18px', color: '#e2e9f2', maxWidth: '600px', marginTop: '16px' }}>{hero2.description}</p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content" style={{ padding: '80px 0' }}>
          <div className="container">
            {/* Goals & Objectives */}
            <div id="goals" className="goals-section" style={{ padding: '40px 0 60px' }}>
              <SectionHeading
                eyebrow="Our Goals & Objectives"
                title="Driving Change Through Leadership and Research"
                copy="GLLIA is committed to strengthening healthcare and community development by investing in leadership, research, skills development, evidence-based practice, and strategic collaboration."
              />
              <div className="goals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '40px' }}>
                {goals.map((goal: any) => {
                  const IconMap: any = { Users: Users, TrendingUp: TrendingUp, BookOpen: BookOpen, Heart: Heart }
                  const IconComponent = IconMap[goal.icon] || Users
                  return (
                    <div key={goal.id} className="goal-card" style={{ background: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '4px solid var(--gold)', transition: 'transform 0.3s ease' }}>
                      <div style={{ background: 'rgba(212, 175, 55, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '16px' }}>
                        <IconComponent size={32} />
                      </div>
                      <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>{goal.title}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{goal.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Testimonials */}
            <section className="quote-section" style={{
              background: 'var(--primary)',
              color: 'var(--white)',
              padding: '100px 0',
              margin: '40px 0',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              paddingLeft: 'calc(50vw - 50%)',
              paddingRight: 'calc(50vw - 50%)'
            }}>
              <div className="container quote-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center', maxWidth: '1160px', margin: '0 auto', width: 'min(1160px, calc(100% - 40px))' }}>
                <div className="quote-slideshow" style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', minHeight: '450px', aspectRatio: '4/3' }}>
                  <div className="slideshow-container" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <div className="slideshow-track" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                      {testimonials.map((testimonial: any, index: number) => (
                        <div key={index} className={`slideshow-slide ${index === testimonialSlide ? 'active' : ''}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: index === testimonialSlide ? 1 : 0, transition: 'opacity 0.6s ease-in-out', pointerEvents: index === testimonialSlide ? 'auto' : 'none' }}>
                          <Image src={testimonial.image} alt={`Testimonial image ${index + 1}`} fill className="slideshow-image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                        </div>
                      ))}
                    </div>
                    <button className="slideshow-btn prev-btn" onClick={prevTestimonial} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', background: 'rgba(0,0,0,0.5)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'white', WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)' }}><ChevronLeft size={24} /></button>
                    <button className="slideshow-btn next-btn" onClick={nextTestimonial} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '12px', background: 'rgba(0,0,0,0.5)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'white', WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)' }}><ChevronRight size={24} /></button>
                    <div className="slideshow-dots" style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                      {testimonials.map((_: any, index: number) => (
                        <button key={index} className={`dot ${index === testimonialSlide ? 'active' : ''}`} onClick={() => setTestimonialSlide(index)} style={{ width: '10px', height: '10px', borderRadius: '50%', background: index === testimonialSlide ? 'var(--gold)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0, transform: index === testimonialSlide ? 'scale(1.2)' : 'scale(1)' }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="quote-text" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Quote className="quote-icon" style={{ color: 'var(--gold)', width: '40px', height: '40px', marginBottom: '8px' }} />
                  <blockquote style={{ font: '400 clamp(24px, 2.8vw, 38px) / 1.3 Georgia, serif', margin: '12px 0 20px', color: 'var(--white)' }}>{testimonials[testimonialSlide].text}</blockquote>
                  <span className="quote-author" style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 600 }}>— {testimonials[testimonialSlide].name}</span>
                  <p className="quote-role" style={{ fontSize: '13px', color: '#c5d1df', marginTop: '4px' }}>{testimonials[testimonialSlide].role}</p>
                </div>
              </div>
            </section>

            {/* Vision, Mission, Goals */}
            <section className="vision-mission-section" style={{ padding: '60px 0' }}>
              <SectionHeading eyebrow="Our Foundation" title="Vision, Mission & Goals" centered />
              <div className="vision-mission-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '40px' }}>
                <div className="vm-card vision" style={{ background: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '4px solid #ffd700', transition: 'transform 0.3s ease' }}>
                  <div className="vm-icon" style={{ color: 'var(--gold)', marginBottom: '12px' }}><Star size={32} /></div>
                  <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>Vision</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{visionMission.vision}</p>
                </div>
                <div className="vm-card mission" style={{ background: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '4px solid #1a2a4a', transition: 'transform 0.3s ease' }}>
                  <div className="vm-icon" style={{ color: 'var(--gold)', marginBottom: '12px' }}><Target size={32} /></div>
                  <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>Mission</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{visionMission.mission}</p>
                </div>
                <div className="vm-card goals" style={{ background: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '4px solid #d4af37', transition: 'transform 0.3s ease' }}>
                  <div className="vm-icon" style={{ color: 'var(--gold)', marginBottom: '12px' }}><Award size={32} /></div>
                  <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>Goals</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {visionMission.goals.map((g: string, i: number) => (
                      <li key={i} style={{ fontSize: '13px', color: 'var(--muted)', padding: '6px 0', paddingLeft: '20px', position: 'relative', lineHeight: '1.5' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>•</span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Hero 3 */}
            <section className="initiatives-hero-3" style={{
              backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.7) 50%, rgba(8,31,65,.3) 100%), url('${hero3.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '100px 0',
              color: 'var(--white)',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              paddingLeft: 'calc(50vw - 50%)',
              paddingRight: 'calc(50vw - 50%)'
            }}>
              <div className="container" style={{ width: 'min(1160px, calc(100% - 40px))', margin: '0 auto' }}>
                <p style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', color: 'var(--white)', maxWidth: '800px', lineHeight: '1.6', fontFamily: 'Georgia, serif', margin: 0 }}>{hero3.description}</p>
              </div>
            </section>

            {/* Journey Timeline */}
            <section className="journey-section" style={{ padding: '60px 0', background: 'var(--cream)', borderRadius: '12px', margin: '40px 0' }}>
              <div className="container">
                <SectionHeading eyebrow="Our Process" title="From Learning to Leadership" copy="How we help individuals grow from learners to leaders in healthcare." centered />
                <div className="journey-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '40px', position: 'relative', alignItems: 'stretch' }}>
                  {journey.map((step: any) => {
                    const IconMap: any = { BookOpen: BookOpen, GraduationCap: GraduationCap, Stethoscope: Stethoscope, Users: Users }
                    const IconComponent = IconMap[step.icon] || Users
                    return (
                      <div key={step.id} className="journey-step" style={{ textAlign: 'center', padding: '24px 16px', position: 'relative', background: 'var(--white)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div className="journey-number" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>{step.number}</div>
                        <div className="journey-icon" style={{ color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconComponent size={32} /></div>
                        <h4 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>{step.title}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 12px' }}>{step.description}</p>
                        {step.id !== '4' && <div className="journey-arrow" style={{ color: 'var(--gold)', fontSize: '24px', marginTop: 'auto', opacity: 0.5 }}>↓</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Impact Stories */}
            <section className="impact-stories-section" style={{ padding: '60px 0' }}>
              <SectionHeading eyebrow="Impact Stories" title="Real Stories, Real Impact" copy="Hear from participants whose lives and careers have been transformed through GLLIA's programmes." centered />
              <div className="impact-stories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '40px' }}>
                {impactStories.map((story: any) => (
                  <div key={story.id} className="impact-story" style={{ background: 'var(--white)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }}>
                    <div className="impact-story-image" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', minHeight: '360px', overflow: 'hidden', background: '#e8e5de' }}>
                      <Image src={story.image} alt={story.name} fill className="impact-story-img" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                      <span className={`impact-badge ${story.badgeClass}`} style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', zIndex: 2, background: story.badgeClass === 'gold' ? '#ffd700' : story.badgeClass === 'silver' ? '#c0c0c0' : story.badgeClass === 'bronze' ? '#cd7f32' : 'var(--primary)', color: story.badgeClass === 'gold' || story.badgeClass === 'silver' ? '#1a2a4a' : 'var(--white)' }}>{story.badge}</span>
                    </div>
                    <div className="impact-story-content" style={{ padding: '24px', flex: 1 }}>
                      {story.quote && <blockquote style={{ fontStyle: 'italic', fontSize: '15px', color: 'var(--primary)', lineHeight: '1.7', margin: '0 0 12px', paddingLeft: '16px', borderLeft: '3px solid var(--gold)' }}>"{story.quote}"</blockquote>}
                      <h4 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 4px' }}>{story.name}</h4>
                      <p className="impact-detail" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 4px' }}>{story.detail}</p>
                      <p className="impact-school" style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px' }}>{story.school}</p>
                      {story.prize && <span className="impact-prize" style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: 'var(--gold)', background: 'rgba(212, 175, 55, 0.1)', padding: '2px 12px', borderRadius: '12px' }}>{story.prize}</span>}
                      {story.list && <div className="winners-2024-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>{story.list.map((item: string, i: number) => <span key={i} style={{ fontSize: '13px', color: 'var(--primary)' }}>{item}</span>)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
      <CTA title="Your leadership can move health forward." button="Join the movement"/>
      <Footer />
    </>
  )
}