'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import logo from '@/public/GLLIA Logo.png'
import { 
  ArrowRight, 
  CalendarDays, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Share2, 
  Camera, 
  Mail, 
  MapPin, 
  Menu, 
  Play, 
  Quote, 
  Search, 
  Sparkles, 
  Users, 
  X, 
  Video 
} from 'lucide-react'

// ========== IMAGES ==========
export const images = {
  hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85',
  
  // Using public folder paths
  image1: '/image1.png',  // Leadership - Emerging Leaders Fellowship
  image2: '/image2.png',  // Community - Health Changemakers
  image3: '/image3.png',  // Learning - GLLIA Learning Lab
  
  // Keep existing images
  team: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85',
  community: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=85',
  training: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85',
  women: 'https://images.unsplash.com/photo-1573496799515-eebbb63814f2?auto=format&fit=crop&w=1000&q=85',
  speaker: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85',
}

// ========== HEADER ==========
export function Header() {
  const [open, setOpen] = useState(false)
  const [about, setAbout] = useState(false)

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Golden Lamp Leadership Initiative Africa</span>
          <span className="topbar-contact">
            <Mail size={14} /> info@goldenlampleadershipinitiativeafrica.org
            <span className="topbar-divider" /> 
            Akure · Ondo · Nigeria
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">
              <Image 
                src={logo} 
                alt="GLLIA Logo" 
                width={100} 
                height={100} 
                className=""
              />
            </span>
            <span>
              <strong>GLLIA</strong>
              <small>Golden Lamp Leadership Initiative Africa</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/initiatives">Initiatives</Link>
            
            {/* About Dropdown */}
            <div className="nav-dropdown">
              <button onClick={() => setAbout(!about)} aria-expanded={about}>
                About <ChevronDown size={15} />
              </button>
              {about && (
                <div className="dropdown-menu">
                  <Link href="/about">Our Story</Link>
                  <Link href="/about#team">Leadership Team</Link>
                  <Link href="/about#mentors">Mentors</Link>
                </div>
              )}
            </div>
            
            <Link href="/events">Events</Link>
            <Link href="/trainings">Trainings</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link href="/contact" className="button button-gold nav-cta">
            Partner with us <ArrowRight size={16} />
          </Link>
          
          <button className="mobile-toggle" onClick={() => setOpen(!open)} 
                  aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mobile-menu">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/initiatives" onClick={() => setOpen(false)}>Initiatives</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About GLLIA</Link>
            <Link href="/events" onClick={() => setOpen(false)}>Events</Link>
            <Link href="/trainings" onClick={() => setOpen(false)}>Trainings</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/contact" className="button button-gold" onClick={() => setOpen(false)}>
              Partner with us <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </header>
    </>
  )
}

// ========== FOOTER ==========
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark">
              <Image 
                src="/GLLIA Logo.png" 
                alt="GLLIA Logo" 
                width={60} 
                height={60} 
                className="footer-logo"
              />
            </span>
            <span>
              <strong>GLLIA</strong>
              <small>Golden Lamp Leadership Initiative Africa</small>
            </span>
          </Link>
          <p className="footer-copy">Shaping visionary health leaders for a stronger Africa.</p>
          <div className="socials">
            <a href="#" aria-label="LinkedIn"><Globe /></a>
            <a href="#" aria-label="Community"><Share2 /></a>
            <a href="#" aria-label="Photos"><Camera /></a>
            <a href="#" aria-label="YouTube"><Video /></a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <Link href="/about">About us</Link>
          <Link href="/initiatives">Our initiatives</Link>
          <Link href="/events">Events & summit</Link>
          <Link href="/trainings">Trainings</Link>
        </div>

        <div>
          <h3>Connect</h3>
          <a href="mailto:info@goldenlampleadershipinitiativeafrica.org">
            info@goldenlampleadershipinitiativeafrica.org
          </a>
          <a href="tel:+2348144414248">+234 814 441 4248</a>
          <span>Akure, Ondo, Nigeria</span>
        </div>

        <div>
          <h3>Stay informed</h3>
          <p>Get updates on leadership opportunities and community impact.</p>
          <form className="newsletter">
            <input type="email" placeholder="Your email address" aria-label="Your email address" />
            <button aria-label="Subscribe"><ArrowRight /></button>
          </form>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <span>© 2025 GLLIA. All rights reserved.</span>
        <span>Built for Africa's health future.</span>
      </div>
    </footer>
  )
}

// ========== SECTION HEADING ==========
export function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false
}: {
  eyebrow: string
  title: string
  copy?: string
  centered?: boolean
}) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

// ========== CALL TO ACTION ==========
export function CTA({
  title = 'Help shape Africa\'s health future.',
  copy = 'Join a community of bold thinkers, dedicated mentors, and changemakers building a healthier continent.',
  button = 'Get involved'
}: {
  title?: string
  copy?: string
  button?: string
}) {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow eyebrow-light">Make an impact</span>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <Link href="/contact" className="button button-light">
          {button} <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}

// ========== CONTACT BLOCK ==========
export function ContactBlock() {
  const [sent, setSent] = useState(false)

  return (
    <section className="contact-section">
      <div className="container contact-grid">
        <div>
          <SectionHeading 
            eyebrow="Let's connect" 
            title="We're building this future together." 
            copy="Whether you want to partner, mentor, learn, or support our work, we'd love to hear from you."
          />
          <div className="contact-details">
            <div>
              <MapPin />
              <span>
                <strong>Visit us</strong>
                Akure, Ondo, Nigeria
              </span>
            </div>
            <div>
              <Mail />
              <span>
                <strong>Email us</strong>
                info@goldenlampleadershipinitiativeafrica.org
              </span>
            </div>
          </div>

          <div className="map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.3660791203574!2d5.20576028946443!3d7.257080847823897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478f90695c5dfb%3A0xe0a5d2bbf32a9161!2sAkure%2C%20Ondo!5e0!3m2!1sen!2sng!4v1786573129495!5m2!1sen!2sng" 
              width="100%" 
              height="250" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="Map showing GLLIA location in Akure, Ondo, Nigeria"
            />
          </div>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="success-state">
              <Sparkles size={34}/>
              <h3>Thank you for reaching out.</h3>
              <p>We'll be in touch with you shortly.</p>
              <button className="button button-navy" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <label>
                Name
                <input required name="name" />
              </label>
              <label>
                Email
                <input required type="email" name="email" />
              </label>
              <label>
                How can we help?
                <select name="reason" defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option>Partner with GLLIA</option>
                  <option>Join a training</option>
                  <option>Become a mentor</option>
                  <option>General enquiry</option>
                </select>
              </label>
              <label>
                Message
                <textarea required name="message" rows={5}/>
              </label>
              <button className="button button-gold" type="submit">
                Send message <ArrowRight size={17}/>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ========== HERO ==========
export function Hero() {
  const [slide, setSlide] = useState(0)
  
  const slides = [
    {
      title: 'Empowering Communities Through Leadership',
      copy: 'At GLLIA, we believe in harnessing the power of effective leadership to inspire change in healthcare and beyond. Our initiatives are designed to uplift and innovate across Africa\'s communities.',
      image: '/GLLI17.jpg'
    },
    {
      title: 'Empowering Leaders for Tomorrow',
      copy: 'At GLLIA, we believe in the power of community-driven change. Join us in our mission to nurture effective leaders in healthcare and community services across Africa. Together, we can uplift our communities through innovation and impactful programs.',
      image: '/GLLI28.jpg'
    }
  ]

  return (
    <section className="hero">
      <div className="hero-image" style={{
        backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.94) 0%, rgba(8,31,65,.62) 46%, rgba(8,31,65,.08) 100%), url(${slides[slide].image})`
      }} />
      
      <div className="container hero-content">
        <span className="eyebrow eyebrow-light">Leadership for Africa's health future</span>
        <h1>{slides[slide].title}</h1>
        <p>{slides[slide].copy}</p>
        <div className="hero-actions">
          <Link href="/about" className="button button-gold">
            Discover GLLIA <ArrowRight size={17}/>
          </Link>
          <Link href="/events" className="text-link light">
            <Play size={16} fill="currentColor"/> Explore our work
          </Link>
        </div>
      </div>

      <div className="hero-controls">
        <button onClick={() => setSlide((slide + slides.length - 1) % slides.length)} 
                aria-label="Previous slide">
          <ChevronLeft/>
        </button>
        <span>0{slide+1} <i/> 0{slides.length}</span>
        <button onClick={() => setSlide((slide + 1) % slides.length)} 
                aria-label="Next slide">
          <ChevronRight/>
        </button>
      </div>
    </section>
  )
}

// ========== IMPACT STRIP ==========
export function ImpactStrip() {
  return (
    <section className="impact-strip">
      <div className="container impact-grid">
        <div>
          <strong>500+</strong>
          <span>Nursing students engaged</span>
        </div>
        <div>
          <strong>5+</strong>
          <span>Universities</span>
        </div>
        <div>
          <strong>10+</strong>
          <span>mentors</span>
        </div>
        <div>
          <strong>300+</strong>
          <span>Research work reviwed</span>
        </div>
      </div>
    </section>
  )
}

// ========== INITIATIVE CARD ==========
export function InitiativeCard({
  title,
  copy,
  tag,
  image,
  href = '/initiatives'
}: {
  title: string
  copy: string
  tag: string
  image: string
  href?: string
}) {
  return (
    <Link href={href} className="initiative-card">
      <div className="card-image" style={{backgroundImage: `url(${image})`}}>
        <span>{tag}</span>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{copy}</p>
        <span className="text-link">Learn more <ArrowRight size={15}/></span>
      </div>
    </Link>
  )
}

// ========== FAQ ==========
export function FAQ() {
  const [open, setOpen] = useState(0)
  const qs = [
    ['Who is GLLIA for?', 'GLLIA is for emerging and established health professionals, students, founders, policy leaders, and allies who believe leadership can transform health outcomes in Africa.'],
    ['How can I get involved?', 'You can join a training, attend our annual summit, volunteer your expertise, become a mentor, or partner with us on a shared initiative.'],
    ['Where does GLLIA work?', 'We are rooted in Kenya and work with a growing network of leaders and partners across Africa.'],
    ['Do you offer scholarships?', 'We are committed to making our programs accessible. Scholarship opportunities are announced with each cohort.']
  ]

  return (
    <div className="faq">
      {qs.map(([q, a], i) => (
        <div className={`faq-item ${open === i ? 'open' : ''}`} key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{q}</span>
            <ChevronDown />
          </button>
          {open === i && <p>{a}</p>}
        </div>
      ))}
    </div>
  )
}