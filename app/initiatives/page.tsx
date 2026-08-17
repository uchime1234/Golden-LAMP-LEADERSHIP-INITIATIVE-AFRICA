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
  // Testimonial Slideshow State
  const [testimonialSlide, setTestimonialSlide] = useState(0)
  
  const testimonials = [
    {
      text: "GLLIA's initiatives have transformed my understanding of leadership in healthcare.",
      name: "Dr. Amina Hassan",
      role: "Healthcare Leader"
    },
    {
      text: "The programs have significantly uplifted the community, empowering many.",
      name: "Chief Oluwaseun Adeyemi",
      role: "Community Advocate"
    },
    {
      text: "I have witnessed firsthand how GLLIA fosters innovation and growth.",
      name: "Prof. Chioma Eze",
      role: "Nursing Educator"
    }
  ]

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setTestimonialSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero 1 - WITH BACKGROUND IMAGE */}
        <section 
          className="initiatives-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('/initiative1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            padding: '120px 0',
            color: 'var(--white)',
            minHeight: '450px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="container">
            <span className="eyebrow eyebrow-light">Our Initiatives</span>
            <h1>Empowering Communities Through Leadership</h1>
            <p style={{ maxWidth: '540px', fontSize: '18px', color: '#e2e9f2' }}>
              At GLLIA, we believe in harnessing the power of effective leadership to inspire change 
              in healthcare and beyond. Our initiatives are designed to uplift and innovate across 
              Africa's communities.
            </p>
            <div className="hero-actions">
              <Link href="#goals" className="button button-gold">
                Discover Our Initiatives <ArrowRight size={17}/>
              </Link>
            </div>
          </div>
        </section>

        {/* Hero 2 - WITH BACKGROUND IMAGE */}
        <section 
          className="initiatives-hero-2"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.7) 50%, rgba(8,31,65,.3) 100%), url('/initiative2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '80px 0',
            color: 'var(--white)',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="container">
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 64px)', margin: 0 }}>
              G.L.L.I.A.
            </h2>
            <p style={{ fontSize: '18px', color: '#e2e9f2', maxWidth: '600px', marginTop: '16px' }}>
              G.L.L.I.A. is a non-governmental organization that is focused on nursing leadership 
              development, research, and community growth in Africa.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content" style={{ padding: '80px 0' }}>
          <div className="container">
            {/* Goals & Objectives Section */}
            <div id="goals" className="goals-section" style={{ padding: '40px 0 60px' }}>
              <SectionHeading 
                eyebrow="Our Goals & Objectives" 
                title="Driving Change Through Leadership and Research" 
                copy="GLLIA is committed to strengthening healthcare and community development by investing in leadership, research, skills development, evidence-based practice, and strategic collaboration."
              />

              <div className="goals-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '30px', 
                marginTop: '40px' 
              }}>
                <div className="goal-card" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid var(--gold)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ 
                    background: 'rgba(212, 175, 55, 0.1)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--gold)',
                    marginBottom: '16px'
                  }}>
                    <Users size={32} />
                  </div>
                  <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>
                    Nurturing Effective Leaders
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                    To nurture effective leaders in the healthcare and community sectors. GLLIA focuses 
                    on developing capable, visionary, and responsible leaders who can contribute 
                    meaningfully to healthcare organizations and communities.
                  </p>
                </div>

                <div className="goal-card" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid var(--gold)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ 
                    background: 'rgba(212, 175, 55, 0.1)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--gold)',
                    marginBottom: '16px'
                  }}>
                    <TrendingUp size={32} />
                  </div>
                  <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>
                    Advancing Leadership Development
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                    To advance leadership development initiatives in healthcare and community-based 
                    organizations by encouraging continuous learning, collaboration, innovation, and 
                    stronger approaches to service delivery.
                  </p>
                </div>

                <div className="goal-card" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid var(--gold)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ 
                    background: 'rgba(212, 175, 55, 0.1)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--gold)',
                    marginBottom: '16px'
                  }}>
                    <BookOpen size={32} />
                  </div>
                  <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>
                    Skills Acquisition & Evidence-Based Practice
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                    To support innovative skills acquisition programs in health-based organizations 
                    and assist individuals in promoting evidence-based implementation in their 
                    respective fields to achieve impact.
                  </p>
                </div>

                <div className="goal-card" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid var(--gold)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ 
                    background: 'rgba(212, 175, 55, 0.1)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--gold)',
                    marginBottom: '16px'
                  }}>
                    <Heart size={32} />
                  </div>
                  <h3 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>
                    Strategic Partnerships & Community Development
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                    Through strategic partnerships with other health-based and leadership development 
                    organizations, we provide support for health-based community development initiatives 
                    that address community health needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials Section - INCREASED IMAGE HEIGHT */}
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
              <div className="container quote-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '70px', 
                alignItems: 'center',
                maxWidth: '1160px',
                margin: '0 auto',
                width: 'min(1160px, calc(100% - 40px))'
              }}>
                {/* Left Column - Image Slideshow - INCREASED HEIGHT */}
                <div className="quote-slideshow" style={{ 
                  position: 'relative', 
                  width: '100%', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  background: 'rgba(255,255,255,0.05)',
                  minHeight: '450px',
                  aspectRatio: '4/3'
                }}>
                  <div className="slideshow-container" style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%', 
                    overflow: 'hidden' 
                  }}>
                    <div className="slideshow-track" style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%' 
                    }}>
                      {testimonials.map((testimonial, index) => (
                        <div 
                          key={index}
                          className={`slideshow-slide ${index === testimonialSlide ? 'active' : ''}`}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === testimonialSlide ? 1 : 0,
                            transition: 'opacity 0.6s ease-in-out',
                            pointerEvents: index === testimonialSlide ? 'auto' : 'none'
                          }}
                        >
                          <Image 
                            src={`/initiative${index + 3}.jpg`}
                            alt={`Testimonial image ${index + 1}`}
                            fill
                            className="slideshow-image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation Controls */}
                    <button 
                      className="slideshow-btn prev-btn" 
                      onClick={prevTestimonial}
                      aria-label="Previous image"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: '12px',
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        color: 'white',
                        WebkitBackdropFilter: 'blur(4px)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      className="slideshow-btn next-btn" 
                      onClick={nextTestimonial}
                      aria-label="Next image"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '12px',
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        color: 'white',
                        WebkitBackdropFilter: 'blur(4px)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Dots */}
                    <div className="slideshow-dots" style={{ 
                      position: 'absolute', 
                      bottom: '16px', 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      display: 'flex', 
                      gap: '8px', 
                      zIndex: 10 
                    }}>
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          className={`dot ${index === testimonialSlide ? 'active' : ''}`}
                          onClick={() => setTestimonialSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: index === testimonialSlide ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                            transform: index === testimonialSlide ? 'scale(1.2)' : 'scale(1)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Testimonial Text */}
                <div className="quote-text" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Quote className="quote-icon" style={{ color: 'var(--gold)', width: '40px', height: '40px', marginBottom: '8px' }} />
                  <blockquote style={{ 
                    font: '400 clamp(24px, 2.8vw, 38px) / 1.3 Georgia, serif', 
                    margin: '12px 0 20px', 
                    color: 'var(--white)' 
                  }}>
                    {testimonials[testimonialSlide].text}
                  </blockquote>
                  <span className="quote-author" style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 600 }}>
                    — {testimonials[testimonialSlide].name}
                  </span>
                  <p className="quote-role" style={{ fontSize: '13px', color: '#c5d1df', marginTop: '4px' }}>
                    {testimonials[testimonialSlide].role}
                  </p>
                </div>
              </div>
            </section>

            {/* Vision, Mission, Goals Section */}
            <section className="vision-mission-section" style={{ padding: '60px 0' }}>
              <SectionHeading 
                eyebrow="Our Foundation" 
                title="Vision, Mission & Goals" 
                centered
              />

              <div className="vision-mission-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '30px', 
                marginTop: '40px' 
              }}>
                <div className="vm-card vision" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid #ffd700',
                  transition: 'transform 0.3s ease'
                }}>
                  <div className="vm-icon" style={{ color: 'var(--gold)', marginBottom: '12px' }}>
                    <Star size={32} />
                  </div>
                  <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>Vision</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                    We exist to promote Excellence in Leadership in Africa.
                  </p>
                </div>

                <div className="vm-card mission" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid #1a2a4a',
                  transition: 'transform 0.3s ease'
                }}>
                  <div className="vm-icon" style={{ color: 'var(--gold)', marginBottom: '12px' }}>
                    <Target size={32} />
                  </div>
                  <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>Mission</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                    We further our vision by providing access to resources that promote growth and 
                    development in Africa for both organizations and individuals.
                  </p>
                </div>

                <div className="vm-card goals" style={{ 
                  background: 'var(--white)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid #d4af37',
                  transition: 'transform 0.3s ease'
                }}>
                  <div className="vm-icon" style={{ color: 'var(--gold)', marginBottom: '12px' }}>
                    <Award size={32} />
                  </div>
                  <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0 0 10px' }}>Goals</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ fontSize: '13px', color: 'var(--muted)', padding: '6px 0', paddingLeft: '20px', position: 'relative', lineHeight: '1.5' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>•</span>
                      Nurture effective leaders in the healthcare and community sectors.
                    </li>
                    <li style={{ fontSize: '13px', color: 'var(--muted)', padding: '6px 0', paddingLeft: '20px', position: 'relative', lineHeight: '1.5' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>•</span>
                      Advance leadership development initiatives in healthcare and community-based organisations.
                    </li>
                    <li style={{ fontSize: '13px', color: 'var(--muted)', padding: '6px 0', paddingLeft: '20px', position: 'relative', lineHeight: '1.5' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>•</span>
                      Support innovative skills acquisition programs in health-based organisations.
                    </li>
                    <li style={{ fontSize: '13px', color: 'var(--muted)', padding: '6px 0', paddingLeft: '20px', position: 'relative', lineHeight: '1.5' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>•</span>
                      Provide support for health-based community development initiatives through strategic partnerships.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Hero 3 - FULL WIDTH WITH INCREASED HEIGHT */}
            <section 
              className="initiatives-hero-3"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.7) 50%, rgba(8,31,65,.3) 100%), url('/initiative7.jpg')`,
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
              }}
            >
              <div className="container" style={{ width: 'min(1160px, calc(100% - 40px))', margin: '0 auto' }}>
                <p style={{ 
                  fontSize: 'clamp(22px, 2.8vw, 34px)', 
                  color: 'var(--white)', 
                  maxWidth: '800px', 
                  lineHeight: '1.6', 
                  fontFamily: 'Georgia, serif',
                  margin: 0
                }}>
                  We design practical programmes that empower nurses, students, researchers, and healthcare 
                  professionals with the knowledge, skills, mentorship, and opportunities needed to transform 
                  healthcare across Africa.
                </p>
              </div>
            </section>

            {/* Journey Timeline Section */}
            <section className="journey-section" style={{ 
              padding: '60px 0', 
              background: 'var(--cream)', 
              borderRadius: '12px', 
              margin: '40px 0' 
            }}>
              <div className="container">
                <SectionHeading 
                  eyebrow="Our Process" 
                  title="From Learning to Leadership" 
                  copy="How we help individuals grow from learners to leaders in healthcare."
                  centered
                />

                <div className="journey-timeline" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '20px', 
                  marginTop: '40px', 
                  position: 'relative',
                  alignItems: 'stretch'
                }}>
                  <div className="journey-step" style={{ 
                    textAlign: 'center', 
                    padding: '24px 16px', 
                    position: 'relative', 
                    background: 'var(--white)', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div className="journey-number" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>01</div>
                    <div className="journey-icon" style={{ color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={32} />
                    </div>
                    <h4 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>Gain Knowledge</h4>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 12px' }}>Individuals gain knowledge and research skills through our structured programmes.</p>
                    <div className="journey-arrow" style={{ color: 'var(--gold)', fontSize: '24px', marginTop: 'auto', opacity: 0.5 }}>↓</div>
                  </div>

                  <div className="journey-step" style={{ 
                    textAlign: 'center', 
                    padding: '24px 16px', 
                    position: 'relative', 
                    background: 'var(--white)', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div className="journey-number" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>02</div>
                    <div className="journey-icon" style={{ color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <GraduationCap size={32} />
                    </div>
                    <h4 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>Develop Skills</h4>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 12px' }}>Through mentorship, participants develop research projects and professional capabilities.</p>
                    <div className="journey-arrow" style={{ color: 'var(--gold)', fontSize: '24px', marginTop: 'auto', opacity: 0.5 }}>↓</div>
                  </div>

                  <div className="journey-step" style={{ 
                    textAlign: 'center', 
                    padding: '24px 16px', 
                    position: 'relative', 
                    background: 'var(--white)', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div className="journey-number" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>03</div>
                    <div className="journey-icon" style={{ color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Stethoscope size={32} />
                    </div>
                    <h4 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>Apply Evidence</h4>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 12px' }}>Participants learn to apply evidence and research findings to real healthcare problems.</p>
                    <div className="journey-arrow" style={{ color: 'var(--gold)', fontSize: '24px', marginTop: 'auto', opacity: 0.5 }}>↓</div>
                  </div>

                  <div className="journey-step" style={{ 
                    textAlign: 'center', 
                    padding: '24px 16px', 
                    position: 'relative', 
                    background: 'var(--white)', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div className="journey-number" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>04</div>
                    <div className="journey-icon" style={{ color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={32} />
                    </div>
                    <h4 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>Lead Change</h4>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>They become researchers, advocates, clinicians and leaders capable of influencing healthcare.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Stories Section - INCREASED WIDTH LIKE EVENTS PAGE */}
            <section className="impact-stories-section" style={{ padding: '60px 0' }}>
              <SectionHeading 
                eyebrow="Impact Stories" 
                title="Real Stories, Real Impact" 
                copy="Hear from participants whose lives and careers have been transformed through GLLIA's programmes."
                centered
              />

              <div className="impact-stories-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '30px', 
                marginTop: '40px' 
              }}>
                {/* Story 1 - Victor Saliu */}
                <div className="impact-story" style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="impact-story-image" style={{ 
                    position: 'relative', 
                    width: '100%',
                    aspectRatio: '4/3',
                    minHeight: '360px',
                    overflow: 'hidden',
                    background: '#e8e5de'
                  }}>
                    <Image 
                      src="/initiative8.png"
                      alt="Victor Saliu"
                      fill
                      className="impact-story-img"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <span className="impact-badge gold" style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      padding: '4px 14px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      background: '#ffd700',
                      color: '#1a2a4a',
                      zIndex: 2
                    }}>🥇 1st Place</span>
                  </div>
                  <div className="impact-story-content" style={{ padding: '24px', flex: 1 }}>
                    <blockquote style={{ 
                      fontStyle: 'italic', 
                      fontSize: '15px', 
                      color: 'var(--primary)', 
                      lineHeight: '1.7', 
                      margin: '0 0 12px', 
                      paddingLeft: '16px', 
                      borderLeft: '3px solid var(--gold)' 
                    }}>
                      "The programme transformed how I approach nursing research. I never imagined 
                      my work could have such impact on patient care."
                    </blockquote>
                    <h4 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 4px' }}>Victor Saliu</h4>
                    <p className="impact-detail" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 4px' }}>2025 Undergraduate Nursing Research Challenge — 1st Place</p>
                    <p className="impact-school" style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px' }}>Redeemer's University</p>
                    <span className="impact-prize" style={{ 
                      display: 'inline-block', 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      color: 'var(--gold)', 
                      background: 'rgba(212, 175, 55, 0.1)', 
                      padding: '2px 12px', 
                      borderRadius: '12px' 
                    }}>₦2,000,000 Prize</span>
                  </div>
                </div>

                {/* Story 2 - Okeagbo Mary Omolola */}
                <div className="impact-story" style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="impact-story-image" style={{ 
                    position: 'relative', 
                    width: '100%',
                    aspectRatio: '4/3',
                    minHeight: '360px',
                    overflow: 'hidden',
                    background: '#e8e5de'
                  }}>
                    <Image 
                      src="/initiative9.png"
                      alt="Okeagbo Mary Omolola"
                      fill
                      className="impact-story-img"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <span className="impact-badge silver" style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      padding: '4px 14px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      background: '#c0c0c0',
                      color: '#1a2a4a',
                      zIndex: 2
                    }}>🥈 2nd Place</span>
                  </div>
                  <div className="impact-story-content" style={{ padding: '24px', flex: 1 }}>
                    <blockquote style={{ 
                      fontStyle: 'italic', 
                      fontSize: '15px', 
                      color: 'var(--primary)', 
                      lineHeight: '1.7', 
                      margin: '0 0 12px', 
                      paddingLeft: '16px', 
                      borderLeft: '3px solid var(--gold)' 
                    }}>
                      "GLLIA gave me the platform to showcase my research and connect with mentors 
                      who believed in my potential."
                    </blockquote>
                    <h4 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 4px' }}>Okeagbo Mary Omolola</h4>
                    <p className="impact-detail" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 4px' }}>2025 Undergraduate Nursing Research Challenge — Finalist</p>
                    <p className="impact-school" style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px' }}>Obafemi Awolowo University</p>
                    <span className="impact-prize" style={{ 
                      display: 'inline-block', 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      color: 'var(--gold)', 
                      background: 'rgba(212, 175, 55, 0.1)', 
                      padding: '2px 12px', 
                      borderRadius: '12px' 
                    }}>2ND PLACE</span>
                  </div>
                </div>

                {/* Story 3 - Uba Paul-Silas */}
                <div className="impact-story" style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="impact-story-image" style={{ 
                    position: 'relative', 
                    width: '100%',
                    aspectRatio: '4/3',
                    minHeight: '360px',
                    overflow: 'hidden',
                    background: '#e8e5de'
                  }}>
                    <Image 
                      src="/initiative10.png"
                      alt="Uba Paul-Silas"
                      fill
                      className="impact-story-img"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <span className="impact-badge bronze" style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      padding: '4px 14px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      background: '#cd7f32',
                      color: 'var(--white)',
                      zIndex: 2
                    }}>🥉 3rd Place</span>
                  </div>
                  <div className="impact-story-content" style={{ padding: '24px', flex: 1 }}>
                    <blockquote style={{ 
                      fontStyle: 'italic', 
                      fontSize: '15px', 
                      color: 'var(--primary)', 
                      lineHeight: '1.7', 
                      margin: '0 0 12px', 
                      paddingLeft: '16px', 
                      borderLeft: '3px solid var(--gold)' 
                    }}>
                      "The mentorship I received through GLLIA helped me refine my research and 
                      present it with confidence."
                    </blockquote>
                    <h4 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 4px' }}>Uba Paul-Silas</h4>
                    <p className="impact-detail" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 4px' }}>2025 Undergraduate Nursing Research Challenge — Finalist</p>
                    <p className="impact-school" style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px' }}>Redeemer's University</p>
                    <span className="impact-prize" style={{ 
                      display: 'inline-block', 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      color: 'var(--gold)', 
                      background: 'rgba(212, 175, 55, 0.1)', 
                      padding: '2px 12px', 
                      borderRadius: '12px' 
                    }}>3RD PLACE WINNER</span>
                  </div>
                </div>

                {/* Winners 2024 */}
                <div className="impact-story winners-2024" style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="impact-story-image" style={{ 
                    position: 'relative', 
                    width: '100%',
                    aspectRatio: '4/3',
                    minHeight: '360px',
                    overflow: 'hidden',
                    background: '#e8e5de'
                  }}>
                    <Image 
                      src="/initiative11.png"
                      alt="Winners 2024"
                      fill
                      className="impact-story-img"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <span className="impact-badge year" style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      padding: '4px 14px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      background: 'var(--primary)',
                      color: 'var(--white)',
                      zIndex: 2
                    }}>2024</span>
                  </div>
                  <div className="impact-story-content" style={{ padding: '24px', flex: 1 }}>
                    <h4 style={{ font: '400 20px Georgia, serif', color: 'var(--primary)', margin: '0 0 4px' }}>Winners 2024</h4>
                    <p className="impact-detail" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 4px' }}>
                      Get involved in community service events that support our mission and values.
                    </p>
                    <div className="winners-2024-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--primary)' }}>🏆 Top Researchers</span>
                      <span style={{ fontSize: '13px', color: 'var(--primary)' }}>🏅 Best Institutions</span>
                      <span style={{ fontSize: '13px', color: 'var(--primary)' }}>⭐ Outstanding Mentors</span>
                    </div>
                  </div>
                </div>
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