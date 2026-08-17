"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
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
  // State for modal
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  // Leadership Team Data
  const leadershipTeam = [
    {
      name: "Mrs. Oluyemisi Otitoloju",
      position: "Founder & Chief Executive Officer",
      image: "/about1.png",
      expertise: ["Leadership", "Nursing Research", "Healthcare Advocacy"],
      background: "Oluyemisi Otitoloju is a healthcare and leadership-development advocate focused on strengthening nursing education, research, evidence-based healthcare practice, and leadership development across Africa.",
      website: "#",
      email: "info@goldenlampleadershipinitiativeafrica.org"
    },
    {
      name: "Dr. Omobola Oluwaseyi",
      position: "Mentor & Advisor",
      image: "/about2.png",
      expertise: ["Nursing Education", "Clinical Practice", "Leadership"],
      background: "Dr. Omobola Oluwaseyi brings years of experience in nursing education and clinical practice, mentoring the next generation of nursing leaders.",
      website: "#",
      email: "info@goldenlampleadershipinitiativeafrica.org"
    },
    {
      name: "Gaknung Bonji K.",
      position: "Research Director",
      image: "/about3.png",
      expertise: ["Research", "Nursing Leadership", "Public Health"],
      background: "Gaknung Bonji K. is a dedicated researcher focused on innovative healthcare solutions and strengthening research capacity across Africa.",
      website: "#",
      email: "info@goldenlampleadershipinitiativeafrica.org"
    },
    {
      name: "Dr. Mercy Aladegboye",
      position: "Mentor & Facilitator",
      image: "/about4.png",
      expertise: ["Nursing Education", "Evidence-Based Practice", "Research"],
      background: "Dr. Mercy Aladegboye is a seasoned nursing educator committed to advancing evidence-based practice and nursing research.",
      website: "#",
      email: "info@goldenlampleadershipinitiativeafrica.org"
    }
  ]

  // Mentors Data
  const mentors = [
    {
      name: "Oluyemisi Otitoloju",
      role: "Founder / Leadership & Research",
      qualification: "MSc. Public Health",
      image: "/about5.png",
      expertise: ["Nursing Leadership", "Research", "Mentorship"],
      category: "Leadership"
    },
    {
      name: "Dr. Omobola Oluwaseyi",
      role: "Mentor",
      image: "/about6.png",
      expertise: ["Nursing Education", "Clinical Practice"],
      category: "Leadership"
    },
    {
      name: "Gaknung Bonji K.",
      role: "Research Director",
      qualification: "RN, RM, RNA, RPHN, BNSc, MSc., MPH",
      image: "/about7.png",
      expertise: ["Research", "Public Health"],
      category: "Research"
    },
    {
      name: "Joy Asufi",
      role: "Facilitator",
      image: "/about8.png",
      expertise: ["Facilitation", "Nursing Education"],
      category: "Clinical Practice"
    },
    {
      name: "Dr. Bolarinwa",
      role: "Facilitator",
      image: "/about9.png",
      expertise: ["Research", "Nursing Leadership"],
      category: "Research"
    },
    {
      name: "Rafiat Anokwuru",
      role: "Facilitator",
      image: "/about10.png",
      expertise: ["Nursing Education", "Facilitation"],
      category: "Clinical Practice"
    },
    {
      name: "Oyinbo Silas",
      role: "Facilitator",
      image: "/about11.png",
      expertise: ["Research", "Healthcare"],
      category: "Research"
    },
    {
      name: "Mr. Fawole Isreal Opeyemi",
      role: "Facilitator",
      image: "/about12.png",
      expertise: ["Facilitation", "Nursing Leadership"],
      category: "Leadership"
    },
    {
      name: "Dr. Mercy Aladegboye",
      role: "Mentor",
      qualification: "MSc, PhD",
      image: "/about13.png",
      expertise: ["Nursing Education", "Evidence-Based Practice"],
      category: "Evidence-Based Practice"
    },
    {
      name: "Mr. Samuel Godwin Atayi",
      role: "Facilitator",
      image: "/about14.png",
      expertise: ["Facilitation", "Research"],
      category: "Research"
    },
    {
      name: "Dr. Onisile Deborah Foluke",
      role: "Mentor",
      qualification: "RN, RM, RPN, RPHN, BNSC, MSC, Ph.D., FWACPNM",
      image: "/about15.png",
      expertise: ["Nursing Education", "Research"],
      category: "Research"
    },
    {
      name: "Mrs. Oluwatosin E. Ogunmuyiwa",
      role: "Facilitator",
      image: "/about16.png",
      expertise: ["Facilitation", "Research"],
      category: "Research"
    },
    {
      name: "Dr. Owolabi Augustine",
      role: "Facilitator",
      image: "/about17.png",
      expertise: ["Research", "Nursing Leadership"],
      category: "Research"
    },
    {
      name: "Dr. Blessing C. Onyemachi-Osigwe",
      role: "Facilitator",
      qualification: "RN, RM, RPN, BNSc, MSc, PhD",
      image: "/about18.png",
      expertise: ["Research", "Nursing Leadership"],
      category: "Research"
    }
  ]

  // Filter mentors
  const filteredMentors = activeFilter === 'All' 
    ? mentors 
    : mentors.filter(m => m.category === activeFilter)

  const filterOptions = ['All', 'Leadership', 'Research', 'Clinical Practice', 'Evidence-Based Practice', 'Data & Analytics']

  return (
    <>
      <Header />
      <main>
        {/* Hero - Who We Are */}
        <section 
          className="about-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('/about19.jpg')`,
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
              <span className="eyebrow eyebrow-light">ABOUT GOLDEN LAMP LEADERSHIP INITIATIVE AFRICA</span>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'Georgia, serif', fontWeight: 400, margin: '20px 0', lineHeight: '1.05' }}>
                Building Leaders. Advancing Healthcare. Transforming Africa.
              </h1>
              <p style={{ fontSize: '18px', color: '#e2e9f2', lineHeight: '1.7', marginBottom: '30px' }}>
                Golden Lamp Leadership Initiative Africa is committed to developing effective leaders, 
                advancing nursing research, promoting evidence-based practice, and creating opportunities 
                that strengthen individuals, organizations, and communities across Africa.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="#story" className="button button-gold">
                  Our Story <ArrowRight size={17}/>
                </Link>
                <Link href="#leadership" className="button button-light">
                  Meet Our Team <ArrowRight size={17}/>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - Timeline Section */}
        <section id="story" className="story-timeline-section" style={{ padding: '100px 0', background: 'var(--cream)' }}>
          <div className="container">
            <SectionHeading 
              eyebrow="Our Story" 
              title="From an Idea to a Growing Leadership Movement" 
              copy="How GLLIA evolved from a vision into a growing movement for nursing leadership and research across Africa."
              centered
            />

            <div className="timeline" style={{ position: 'relative', marginTop: '60px', paddingLeft: '40px' }}>
              {/* Timeline Line */}
              <div style={{ 
                position: 'absolute', 
                left: '15px', 
                top: 0, 
                bottom: 0, 
                width: '3px', 
                background: 'var(--gold)',
                opacity: 0.3
              }} />

              {/* Timeline Item 1 */}
              <div className="timeline-item" style={{ 
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
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>01 — The Beginning</span>
                  <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '10px 0 16px' }}>How It All Started</h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8' }}>
                    GLLIA was founded with a clear mission: to address the leadership gap in African healthcare. 
                    The founders recognized that strong leadership and research capacity were essential for 
                    transforming health systems across the continent.
                  </p>
                </div>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <Image 
                    src="/about20.png"
                    alt="The Beginning"
                    width={500}
                    height={300}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="timeline-item" style={{ 
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
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>02 — Building the Foundation</span>
                  <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '10px 0 16px' }}>Early Programmes & Growth</h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8' }}>
                    GLLIA launched its first leadership development programmes, bringing together healthcare 
                    professionals, students, and mentors. Community engagement and capacity-building initiatives 
                    began to take shape across Nigeria.
                  </p>
                </div>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <Image 
                    src="/about21.png"
                    alt="Building the Foundation"
                    width={500}
                    height={300}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="timeline-item" style={{ 
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
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>03 — Advancing Nursing Research</span>
                  <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '10px 0 16px' }}>Research & Mentorship</h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8' }}>
                    GLLIA developed structured nursing research programmes and mentorship opportunities, 
                    creating pathways for students and professionals to build research capacity, present 
                    their work, and contribute to evidence-based practice.
                  </p>
                </div>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <Image 
                    src="/about22.png"
                    alt="Advancing Nursing Research"
                    width={500}
                    height={300}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="timeline-item" style={{ 
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
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>04 — From Research to Practice</span>
                  <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '10px 0 16px' }}>Evidence-Based Practice</h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8' }}>
                    GLLIA expanded its focus to include evidence-based practice and professional development, 
                    helping healthcare professionals translate research findings into practical solutions 
                    for patient care and community health.
                  </p>
                </div>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <Image 
                    src="/about23.png"
                    alt="From Research to Practice"
                    width={500}
                    height={300}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Timeline Item 5 */}
              <div className="timeline-item" style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '40px', 
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
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>05 — The Future</span>
                  <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '10px 0 16px' }}>A Stronger Generation of Leaders</h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8' }}>
                    GLLIA's vision is to develop a stronger generation of healthcare leaders across Africa, 
                    equipped with the skills, knowledge, and networks to transform health systems and improve 
                    outcomes for communities across the continent.
                  </p>
                </div>
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <Image 
                    src="/about24.png"
                    alt="The Future"
                    width={500}
                    height={300}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Drives Us - Three Principles */}
        <section className="drives-section" style={{ 
          padding: '100px 0', 
          background: 'var(--primary)',
          color: 'var(--white)'
        }}>
          <div className="container">
            <SectionHeading 
              eyebrow="What Drives Us" 
              title="Our Work Is Built Around Three Principles" 
              centered
            />

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '30px', 
              marginTop: '50px' 
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '40px 32px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  background: 'rgba(212, 175, 55, 0.15)', 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--gold)',
                  margin: '0 auto 20px'
                }}>
                  <Users size={34} />
                </div>
                <h3 style={{ font: '400 26px Georgia, serif', margin: '0 0 12px' }}>Leadership</h3>
                <p style={{ fontSize: '15px', color: '#c5d1df', lineHeight: '1.7' }}>
                  Developing capable, ethical and visionary leaders who can create meaningful change 
                  in healthcare and communities across Africa.
                </p>
              </div>

              <div style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '40px 32px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  background: 'rgba(212, 175, 55, 0.15)', 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--gold)',
                  margin: '0 auto 20px'
                }}>
                  <BookOpen size={34} />
                </div>
                <h3 style={{ font: '400 26px Georgia, serif', margin: '0 0 12px' }}>Research</h3>
                <p style={{ fontSize: '15px', color: '#c5d1df', lineHeight: '1.7' }}>
                  Strengthening nursing research and developing the next generation of researchers 
                  who will drive evidence-based practice and innovation.
                </p>
              </div>

              <div style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '40px 32px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  background: 'rgba(212, 175, 55, 0.15)', 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--gold)',
                  margin: '0 auto 20px'
                }}>
                  <Heart size={34} />
                </div>
                <h3 style={{ font: '400 26px Georgia, serif', margin: '0 0 12px' }}>Impact</h3>
                <p style={{ fontSize: '15px', color: '#c5d1df', lineHeight: '1.7' }}>
                  Turning knowledge and evidence into practical solutions for healthcare and communities, 
                  creating lasting change that improves lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission + Vision Section */}
        <section className="mission-vision-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '60px', 
              alignItems: 'center' 
            }}>
              <div>
                <span className="eyebrow">Our Vision</span>
                <h2 style={{ font: '400 clamp(36px, 4vw, 56px) Georgia, serif', color: 'var(--primary)', margin: '12px 0 20px' }}>
                  Excellence in Leadership in Africa.
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>
                  We envision a future where African healthcare is transformed by leaders who are ethical, 
                  visionary, and equipped to create meaningful change in their communities.
                </p>
              </div>
              <div>
                <span className="eyebrow">Our Mission</span>
                <h2 style={{ font: '400 clamp(28px, 3vw, 40px) Georgia, serif', color: 'var(--primary)', margin: '12px 0 20px' }}>
                  Providing Access to Resources That Promote Growth and Development.
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>
                  We further our mission by providing access to resources that promote growth and development 
                  in Africa for both organizations and individuals.
                </p>
              </div>
            </div>

            {/* Our Goals */}
            <div style={{ marginTop: '60px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
              <SectionHeading 
                eyebrow="Our Goals" 
                title="What We're Working Toward" 
                centered
              />
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '20px', 
                marginTop: '30px' 
              }}>
                {[
                  'Leadership Development',
                  'Nursing Research',
                  'Skills Acquisition',
                  'Evidence-Based Practice',
                  'Community Development',
                  'Strategic Partnerships'
                ].map((goal, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    background: 'var(--cream)',
                    padding: '14px 20px',
                    borderRadius: '8px'
                  }}>
                    <Award size={18} color="var(--gold)" />
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section id="leadership" className="leadership-section" style={{ padding: '100px 0', background: 'var(--cream)' }}>
          <div className="container">
            <SectionHeading 
              eyebrow="Leadership Team" 
              title="Meet Our Leadership" 
              copy="The people guiding GLLIA's mission and shaping its programmes across Africa."
              centered
            />

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '30px', 
              marginTop: '50px' 
            }}>
              {leadershipTeam.map((leader, index) => (
                <div 
                  key={index}
                  style={{ 
                    background: 'var(--white)', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedLeader(index)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    aspectRatio: '4 / 5', 
                    background: '#e8e5de',
                    overflow: 'hidden'
                  }}>
                    <Image 
                      src={leader.image}
                      alt={leader.name}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ font: '400 22px Georgia, serif', color: 'var(--primary)', margin: '0' }}>{leader.name}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--gold)', fontWeight: 600, margin: '4px 0 12px' }}>{leader.position}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {leader.expertise.map((exp, i) => (
                        <span key={i} style={{ 
                          fontSize: '11px', 
                          background: 'rgba(212, 175, 55, 0.1)', 
                          color: 'var(--gold)', 
                          padding: '2px 10px', 
                          borderRadius: '12px',
                          fontWeight: 600
                        }}>
                          {exp}
                        </span>
                      ))}
                    </div>
                    <button style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--gold)', 
                      fontWeight: 600, 
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      View Profile <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder's Story Section */}
        <section className="founder-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
          <div className="container">
            <SectionHeading 
              eyebrow="The Leadership Behind the Vision" 
              title="The Founder's Story" 
              centered
            />

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '60px', 
              alignItems: 'center',
              marginTop: '50px'
            }}>
              <div style={{ 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
              }}>
                <Image 
                  src="/about25.png"
                  alt="Mrs. Oluyemisi Otitoloju - Founder"
                  width={600}
                  height={500}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Founder & Convener
                </span>
                <h2 style={{ font: '400 36px Georgia, serif', color: 'var(--primary)', margin: '12px 0 8px' }}>
                  Mrs. Oluyemisi Otitoloju
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Oluyemisi Otitoloju is a healthcare and leadership-development advocate focused on 
                  strengthening nursing education, research, evidence-based healthcare practice, and 
                  leadership development across Africa.
                </p>
                <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                  Through GLLIA, she works to develop future healthcare leaders, strengthen research capacity 
                  among nursing students and professionals, promote evidence-based practice, and support 
                  healthcare-focused community development.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  {['Nursing Leadership', 'Healthcare Research', 'Evidence-Based Practice', 'Leadership Development', 'Community Development'].map((area, i) => (
                    <span key={i} style={{ 
                      fontSize: '12px', 
                      background: 'var(--cream)', 
                      padding: '4px 14px', 
                      borderRadius: '16px',
                      color: 'var(--primary)',
                      fontWeight: 500
                    }}>
                      {area}
                    </span>
                  ))}
                </div>
                <Link href="#" className="button button-gold">
                  Read Full Story <ArrowRight size={17}/>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="mentors-section" style={{ padding: '100px 0', background: 'var(--cream)' }}>
          <div className="container">
            <SectionHeading 
              eyebrow="Our Mentors" 
              title="Guided by Experience. Empowered to Lead." 
              copy="Our mentors bring experience across nursing, research, healthcare leadership, academia, evidence-based practice, and related fields. Through mentorship, they help emerging professionals transform knowledge into meaningful impact."
              centered
            />

            {/* Filter Buttons */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '10px', 
              marginTop: '40px' 
            }}>
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '30px',
                    border: activeFilter === filter ? '2px solid var(--gold)' : '1px solid var(--border)',
                    background: activeFilter === filter ? 'var(--gold)' : 'transparent',
                    color: activeFilter === filter ? 'var(--primary)' : 'var(--muted)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Mentor Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '24px', 
              marginTop: '40px' 
            }}>
              {filteredMentors.map((mentor, index) => (
                <div key={index} style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    aspectRatio: '4 / 5', 
                    background: '#e8e5de',
                    overflow: 'hidden'
                  }}>
                    <Image 
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ font: '400 18px Georgia, serif', color: 'var(--primary)', margin: '0' }}>{mentor.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, margin: '2px 0' }}>{mentor.role}</p>
                    {mentor.qualification && (
                      <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '2px 0 10px' }}>{mentor.qualification}</p>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {mentor.expertise.map((exp, i) => (
                        <span key={i} style={{ 
                          fontSize: '10px', 
                          background: 'rgba(212, 175, 55, 0.1)', 
                          color: 'var(--gold)', 
                          padding: '2px 8px', 
                          borderRadius: '10px',
                          fontWeight: 600
                        }}>
                          {exp}
                        </span>
                      ))}
                    </div>
                    <button style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--gold)', 
                      fontWeight: 600, 
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '10px',
                      padding: 0
                    }}>
                      View Profile <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* People Are at the Heart Section */}
        <section className="people-heart-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '60px', 
              alignItems: 'center' 
            }}>
              <div>
                <span className="eyebrow">The People Behind the Programmes</span>
                <h2 style={{ font: '400 clamp(32px, 3.5vw, 48px) Georgia, serif', color: 'var(--primary)', margin: '16px 0 20px' }}>
                  People Are at the Heart of Our Work
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>
                  From students beginning their research journey to experienced professionals sharing their 
                  knowledge, GLLIA is built around a community committed to learning, leadership and impact.
                </p>
                <div style={{ marginTop: '24px' }}>
                  <Link href="/initiatives" className="button button-gold">
                    Explore Our Initiatives <ArrowRight size={17}/>
                  </Link>
                </div>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px' 
              }}>
                {[26, 27, 28, 29, 30, 31].map((num) => (
                  <div key={num} style={{ 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    aspectRatio: '1/1',
                    background: '#e8e5de'
                  }}>
                    <Image 
                      src={`/about${num}.png`}
                      alt={`Community ${num}`}
                      width={200}
                      height={200}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section" style={{ 
          padding: '100px 0', 
          background: 'var(--primary)',
          color: 'var(--white)',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{ font: '400 clamp(32px, 4vw, 52px) Georgia, serif', margin: '0 0 16px' }}>
              Be Part of the GLLIA Community
            </h2>
            <p style={{ fontSize: '18px', color: '#c5d1df', maxWidth: '600px', margin: '0 auto 36px', lineHeight: '1.7' }}>
              Whether you are a student, nurse, researcher, healthcare professional, mentor, institution or 
              organization, there is a place for you to contribute to the movement.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/initiatives" className="button button-gold">
                Join an Initiative <ArrowRight size={17}/>
              </Link>
              <Link href="/contact" className="button button-light">
                Become a Mentor <ArrowRight size={17}/>
              </Link>
              <Link href="/contact" className="button" style={{ 
                background: 'transparent', 
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'var(--white)'
              }}>
                Partner With GLLIA <ArrowRight size={17}/>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Leadership Profile Modal */}
      {selectedLeader !== null && (
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
        }} onClick={() => setSelectedLeader(null)}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '16px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            padding: '40px'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedLeader(null)}
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
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#e8e5de'
              }}>
                <Image 
                  src={leadershipTeam[selectedLeader].image}
                  alt={leadershipTeam[selectedLeader].name}
                  width={120}
                  height={120}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>
              <div>
                <h3 style={{ font: '400 28px Georgia, serif', color: 'var(--primary)', margin: '0' }}>
                  {leadershipTeam[selectedLeader].name}
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 600, margin: '4px 0 12px' }}>
                  {leadershipTeam[selectedLeader].position}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {leadershipTeam[selectedLeader].expertise.map((exp, i) => (
                    <span key={i} style={{ 
                      fontSize: '11px', 
                      background: 'rgba(212, 175, 55, 0.1)', 
                      color: 'var(--gold)', 
                      padding: '2px 12px', 
                      borderRadius: '12px',
                      fontWeight: 600
                    }}>
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <h4 style={{ font: '600 16px Georgia, serif', color: 'var(--primary)', margin: '0 0 8px' }}>Professional Background</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7' }}>
                {leadershipTeam[selectedLeader].background}
              </p>
            </div>
            
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <a href={leadershipTeam[selectedLeader].website} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none'
              }}>
                <Globe size={18} /> Website
              </a>
              <a href={`mailto:${leadershipTeam[selectedLeader].email}`} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none'
              }}>
                <Mail size={18} /> Email
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}