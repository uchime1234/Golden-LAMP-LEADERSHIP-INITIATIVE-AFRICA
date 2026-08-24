"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Mail,
  Phone,
  Quote,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Globe,
  Briefcase
} from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [aboutData, setAboutData] = useState<any>(null)
  const [teamData, setTeamData] = useState<any[]>([])
  const [mentorData, setMentorData] = useState<any[]>([])

  // State for modal
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null)

  // Fetch data from JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, teamRes, mentorRes] = await Promise.all([
          fetch('/api/content/about'),
          fetch('/api/content/team'),
          fetch('/api/content/mentors')
        ])
        const about = await aboutRes.json()
        const team = await teamRes.json()
        const mentors = await mentorRes.json()
        
        setAboutData(about)
        setTeamData(team.filter((t: any) => !t.deleted))
        setMentorData(mentors.filter((m: any) => !m.deleted))
      } catch (error) {
        console.error('Failed to fetch about data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Scroll to section on load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }, [loading])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${targetId}`)
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

  if (!aboutData) return null

  const { hero, story, drives, visionMission, peopleHeart, founder } = aboutData

  return (
    <>
      <Header />
      <main>
        {/* Hero - FROM JSON */}
        <section
          className="about-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('${hero.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '120px 0',
            color: 'var(--white)',
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="container">
            <div style={{ maxWidth: '600px' }}>
              <span className="eyebrow eyebrow-light">{hero.eyebrow}</span>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'Georgia, serif', fontWeight: 400, margin: '20px 0', lineHeight: '1.05' }}>
                {hero.title}
              </h1>
              <p style={{ fontSize: '18px', color: '#e2e9f2', lineHeight: '1.7', marginBottom: '30px' }}>
                {hero.description}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#story" className="button button-gold" onClick={(e) => handleSmoothScroll(e, 'story')}>
                  Our Story <ArrowRight size={17}/>
                </a>
                <a href="#leadership" className="button button-light" onClick={(e) => handleSmoothScroll(e, 'leadership')}>
                  Meet Our Team <ArrowRight size={17}/>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - FROM JSON */}
        <section id="story" className="story-timeline-section" style={{ padding: '100px 0', background: 'var(--cream)', scrollMarginTop: '100px' }}>
          <div className="container">
            <SectionHeading
              eyebrow={story.eyebrow}
              title={story.title}
              copy={story.description}
              centered
            />

            <div className="timeline" style={{ position: 'relative', marginTop: '60px', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '3px', background: 'var(--gold)', opacity: 0.3 }} />

              {story.timeline.map((item: any) => (
                <div key={item.id} className="timeline-item" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '40px',
                  marginBottom: '60px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-33px',
                    top: '10px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    border: '3px solid var(--cream)'
                  }} />
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>{item.number} — {item.title}</span>
                    <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '10px 0 16px' }}>{item.subtitle}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8' }}>{item.description}</p>
                  </div>
                  <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Image src={item.image} alt={item.title} width={500} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Drives Us - FROM JSON */}
        <section className="drives-section" style={{ padding: '100px 0', background: 'var(--primary)', color: 'var(--white)' }}>
          <div className="container">
            <SectionHeading eyebrow={drives.eyebrow} title={drives.title} centered />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '50px' }}>
              {drives.principles.map((principle: any, index: number) => {
                const IconMap: any = { Users: Users, BookOpen: BookOpen, Heart: Heart }
                const IconComponent = IconMap[principle.icon] || Users
                return (
                  <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '40px 32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(212, 175, 55, 0.15)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', margin: '0 auto 20px' }}>
                      <IconComponent size={34} />
                    </div>
                    <h3 style={{ font: '400 26px Georgia, serif', margin: '0 0 12px' }}>{principle.title}</h3>
                    <p style={{ fontSize: '15px', color: '#c5d1df', lineHeight: '1.7' }}>{principle.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission + Vision - FROM JSON */}
        <section className="mission-vision-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <span className="eyebrow">Our Vision</span>
                <h2 style={{ font: '400 clamp(36px, 4vw, 56px) Georgia, serif', color: 'var(--primary)', margin: '12px 0 20px' }}>
                  {visionMission.vision}
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>
                  We envision a future where African healthcare is transformed by leaders who are ethical, visionary, and equipped to create meaningful change in their communities.
                </p>
              </div>
              <div>
                <span className="eyebrow">Our Mission</span>
                <h2 style={{ font: '400 clamp(28px, 3vw, 40px) Georgia, serif', color: 'var(--primary)', margin: '12px 0 20px' }}>
                  {visionMission.mission}
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>
                  {visionMission.missionDescription}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '60px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
              <SectionHeading eyebrow="Our Goals" title="What We're Working Toward" centered />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                {visionMission.goals.map((goal: string, index: number) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--cream)', padding: '14px 20px', borderRadius: '8px' }}>
                    <Award size={18} color="var(--gold)" />
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Story - FROM JSON */}
        <section className="founder-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
          <div className="container">
            <SectionHeading eyebrow={founder.eyebrow} title={founder.title} centered />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginTop: '50px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                <Image src={founder.image} alt={founder.name} width={600} height={500} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Founder & Convener</span>
                <h2 style={{ font: '400 36px Georgia, serif', color: 'var(--primary)', margin: '12px 0 8px' }}>{founder.name}</h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>{founder.description}</p>
                <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>{founder.description2}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  {founder.areas.map((area: string, i: number) => (
                    <span key={i} style={{ fontSize: '12px', background: 'var(--cream)', padding: '4px 14px', borderRadius: '16px', color: 'var(--primary)', fontWeight: 500 }}>{area}</span>
                  ))}
                </div>
                <Link href="#" className="button button-gold">Read Full Story <ArrowRight size={17}/></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team - FROM JSON */}
        <section id="leadership" className="leadership-section" style={{ padding: '100px 0', background: 'var(--cream)', scrollMarginTop: '100px' }}>
          <div className="container">
            <SectionHeading eyebrow="Leadership Team" title="Meet Our Team" copy="The people guiding GLLIA's mission and shaping its programmes across Africa." centered />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '50px' }}>
              {teamData.map((leader: any, index: number) => (
                <div key={leader.id} style={{ background: 'var(--white)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease', cursor: 'pointer' }}
                  onClick={() => setSelectedLeader(index)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', background: '#e8e5de', overflow: 'hidden' }}>
                    <Image src={leader.image} alt={leader.name} fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0' }}>{leader.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, margin: '4px 0 10px' }}>{leader.position}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {leader.expertise && leader.expertise.map((exp: string, i: number) => (
                        <span key={i} style={{ fontSize: '10px', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>{exp}</span>
                      ))}
                    </div>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--gold)', fontWeight: 600, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>View Profile <ArrowRight size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentors - FROM JSON */}
        <section id="mentors" className="mentors-section" style={{ padding: '100px 0', background: 'var(--cream)', scrollMarginTop: '100px' }}>
          <div className="container">
            <SectionHeading eyebrow="Our Mentors" title="Guided by Experience. Empowered to Lead." copy="Our mentors bring experience across nursing, research, healthcare leadership, academia, evidence-based practice, and related fields. Through mentorship, they help emerging professionals transform knowledge into meaningful impact." centered />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '40px' }}>
              {mentorData.map((mentor: any) => (
                <div key={mentor.id} style={{ background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', background: '#e8e5de', overflow: 'hidden' }}>
                    <Image src={mentor.image} alt={mentor.name} fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h4 style={{ font: '400 15px Georgia, serif', color: 'var(--primary)', margin: '0' }}>{mentor.name}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 600, margin: '2px 0' }}>{mentor.role}</p>
                    {mentor.qualification && <p style={{ fontSize: '10px', color: 'var(--muted)', margin: '2px 0 6px' }}>{mentor.qualification}</p>}
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--gold)', fontWeight: 600, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '6px', padding: 0 }}>View Profile <ArrowRight size={10} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* People Are at the Heart - FROM JSON */}
        <section className="people-heart-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <span className="eyebrow">{peopleHeart.eyebrow}</span>
                <h2 style={{ font: '400 clamp(32px, 3.5vw, 48px) Georgia, serif', color: 'var(--primary)', margin: '16px 0 20px' }}>{peopleHeart.title}</h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>{peopleHeart.description}</p>
                <div style={{ marginTop: '24px' }}>
                  <Link href="/initiatives" className="button button-gold">Explore Our Initiatives <ArrowRight size={17}/></Link>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {peopleHeart.images.map((img: string, index: number) => (
                  <div key={index} style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '1/1', background: '#e8e5de' }}>
                    <Image src={img} alt={`Community ${index + 1}`} width={200} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta-section" style={{ padding: '100px 0', background: 'var(--primary)', color: 'var(--white)', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ font: '400 clamp(32px, 4vw, 52px) Georgia, serif', margin: '0 0 16px' }}>Be Part of the GLLIA Community</h2>
            <p style={{ fontSize: '18px', color: '#c5d1df', maxWidth: '600px', margin: '0 auto 36px', lineHeight: '1.7' }}>
              Whether you are a student, nurse, researcher, healthcare professional, mentor, institution or organization, there is a place for you to contribute to the movement.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/initiatives" className="button button-gold">Join an Initiative <ArrowRight size={17}/></Link>
              <Link href="/contact" className="button button-light">Become a Mentor <ArrowRight size={17}/></Link>
              <Link href="/contact" className="button" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: 'var(--white)' }}>Partner With GLLIA <ArrowRight size={17}/></Link>
            </div>
          </div>
        </section>
      </main>

      {/* Leadership Profile Modal */}
      {selectedLeader !== null && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelectedLeader(null)}>
          <div style={{ background: 'var(--white)', borderRadius: '16px', maxWidth: '700px', width: '100%', maxHeight: '80vh', overflow: 'auto', position: 'relative', padding: '40px' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedLeader(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={24} /></button>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#e8e5de' }}>
                <Image src={teamData[selectedLeader].image} alt={teamData[selectedLeader].name} width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
              </div>
              <div>
                <h3 style={{ font: '400 24px Georgia, serif', color: 'var(--primary)', margin: '0' }}>{teamData[selectedLeader].name}</h3>
                <p style={{ fontSize: '15px', color: 'var(--gold)', fontWeight: 600, margin: '4px 0 10px' }}>{teamData[selectedLeader].position}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {teamData[selectedLeader].expertise && teamData[selectedLeader].expertise.map((exp: string, i: number) => (
                    <span key={i} style={{ fontSize: '11px', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', padding: '2px 12px', borderRadius: '12px', fontWeight: 600 }}>{exp}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <h4 style={{ font: '600 15px Georgia, serif', color: 'var(--primary)', margin: '0 0 6px' }}>Professional Background</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7' }}>{teamData[selectedLeader].background}</p>
            </div>
            <div style={{ marginTop: '14px', display: 'flex', gap: '12px' }}>
              <a href={teamData[selectedLeader].website} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}><Globe size={18} /> Website</a>
              <a href={`mailto:${teamData[selectedLeader].email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}><Mail size={18} /> Email</a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}