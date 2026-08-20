"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  ArrowRight, 
  BookOpen, 
  HeartHandshake, 
  Lightbulb, 
  Quote, 
  Users,
  Award,
  GraduationCap,
  Stethoscope,
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { 
  CTA, 
  ContactBlock, 
  Footer, 
  Header, 
  Hero, 
  ImpactStrip, 
  SectionHeading, 
  images 
} from '@/components/gllia-site'

export default function HomePage() {
  // State for testimonial image slideshow
  const [testimonialSlide, setTestimonialSlide] = useState(0)
  
  const testimonialImages = [
    '/corn1.jpg',
    '/corn2.jpg',
    '/corn3.jpg'
  ]

  const nextSlide = () => {
    setTestimonialSlide((prev) => (prev + 1) % testimonialImages.length)
  }

  const prevSlide = () => {
    setTestimonialSlide((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length)
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ImpactStrip />
        
        {/* Section 1: Why GLLIA */}
        <section className="intro-section">
          <div className="container split-intro">
            <div>
              <SectionHeading 
                eyebrow="Why GLLIA" 
                title="Health systems change when people are equipped to lead." 
              />
            </div>
            <div>
              <p className="large-copy">
                Africa has the talent, the insight, and the ambition to build healthier communities. 
                GLLIA exists to connect that potential with the leadership development, mentorship, 
                and platforms needed to turn ideas into impact.
              </p>
              <Link href="/about" className="text-link">
                Our story <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </section>

        {/* CEO Executive Leadership Section */}
        <section className="ceo-section">
          <div className="container">
            <div className="ceo-grid">
              <div className="ceo-content">
                <span className="eyebrow">Golden Lamp Leadership Initiative Africa</span>
                <span className="ceo-label">The Founder & CEO</span>
                
                <h2 className="ceo-name">Mrs. Oluyemisi Otitoloju</h2>
                <p className="ceo-title">
                  Founder & Chief Executive Officer, Golden Lamp Leadership Initiative Africa (GLLIA)
                </p>
                
                <p className="ceo-description">
                  Oluyemisi Otitoloju is a healthcare and leadership-development advocate focused 
                  on strengthening nursing education, research, evidence-based healthcare practice, 
                  and leadership development across Africa. Through GLLIA, she works to develop 
                  future healthcare leaders, strengthen research capacity among nursing students 
                  and professionals, promote evidence-based practice, and support healthcare-focused 
                  community development.
                </p>

                <div className="ceo-key-areas">
                  <div className="key-area">
                    <Award size={20} />
                    <span>Nursing Leadership</span>
                  </div>
                  <div className="key-area">
                    <GraduationCap size={20} />
                    <span>Healthcare Research</span>
                  </div>
                  <div className="key-area">
                    <Stethoscope size={20} />
                    <span>Evidence-Based Practice</span>
                  </div>
                  <div className="key-area">
                    <Target size={20} />
                    <span>Leadership Development</span>
                  </div>
                  <div className="key-area">
                    <Users size={20} />
                    <span>Community Development</span>
                  </div>
                </div>

                <blockquote className="ceo-quote">
                  <Quote size={24} />
                  <p>
                    "Building stronger healthcare systems by developing leaders, advancing research, 
                    and turning evidence into meaningful impact across African communities."
                  </p>
                </blockquote>

                <p className="ceo-closing">
                  <strong>Empowering Leaders. Advancing Evidence. Strengthening Communities.</strong>
                </p>
              </div>

              <div className="ceo-portrait">
                <div className="portrait-frame">
                  <img 
                    src="/ceo-potrait.jpg"
                    alt="Mrs. Oluyemisi Otitoloju - Founder & CEO, Golden Lamp Leadership Initiative Africa"
                    className="portrait-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Initiatives */}
        <section className="initiatives-section">
          <div className="container">
            <div className="section-row">
              <SectionHeading 
                eyebrow="What we do" 
                title="Building the leaders Africa needs." 
                copy="We create practical pathways for health professionals to grow their influence and multiply their impact."
              />
              <Link href="/initiatives" className="text-link">
                View all initiatives <ArrowRight size={16}/>
              </Link>
            </div>
            
            <div className="initiative-grid">
              <Link href="/initiatives" className="initiative-card">
                <div className="card-image">
                  <Image 
                    src="/image1.png"
                    alt="Leadership - Emerging Leaders Fellowship"
                    width={500}
                    height={300}
                    className="card-image-img"
                    priority
                  />
                  <span className="card-tag">Leadership</span>
                </div>
                <div className="card-body">
                  <h3>Emerging Leaders Fellowship</h3>
                  <p>A transformational fellowship for the next generation of health systems leaders.</p>
                  <span className="text-link">Learn more <ArrowRight size={15}/></span>
                </div>
              </Link>

              <Link href="/initiatives" className="initiative-card">
                <div className="card-image">
                  <Image 
                    src="/image2.png"
                    alt="Community - Health Changemakers"
                    width={500}
                    height={300}
                    className="card-image-img"
                  />
                  <span className="card-tag">Community</span>
                </div>
                <div className="card-body">
                  <h3>Health Changemakers</h3>
                  <p>Connecting bold ideas with communities and partners ready to make change happen.</p>
                  <span className="text-link">Learn more <ArrowRight size={15}/></span>
                </div>
              </Link>

              <Link href="/initiatives" className="initiative-card">
                <div className="card-image">
                  <Image 
                    src="GLLIA Logo.png"
                    alt="Learning - GLLIA Learning Lab"
                    width={500}
                    height={300}
                    className="card-image-img"
                  />
                  <span className="card-tag">Learning</span>
                </div>
                <div className="card-body">
                  <h3>GLLIA Learning Lab</h3>
                  <p>Practical, accessible learning experiences for leaders at every stage.</p>
                  <span className="text-link">Learn more <ArrowRight size={15}/></span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Quote - WITH IMAGE SLIDESHOW */}
        <section className="quote-section">
          <div className="container quote-grid">
            {/* Left Column - Image Slideshow */}
            <div className="quote-slideshow">
              <div className="slideshow-container">
                <div className="slideshow-track">
                  {testimonialImages.map((img, index) => (
                    <div 
                      key={index}
                      className={`slideshow-slide ${index === testimonialSlide ? 'active' : ''}`}
                    >
                      <Image 
                        src={img}
                        alt={`Testimonial image ${index + 1}`}
                        width={500}
                        height={400}
                        className="slideshow-image"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Controls */}
                <button 
                  className="slideshow-btn prev-btn" 
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="slideshow-btn next-btn" 
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
                
                {/* Dots */}
                <div className="slideshow-dots">
                  {testimonialImages.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === testimonialSlide ? 'active' : ''}`}
                      onClick={() => setTestimonialSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Testimonial Text */}
            <div className="quote-text">
              <Quote className="quote-icon"/>
            <blockquote>
              “GLLIA gave me the research skills and confidence to present my nursing project at a national conference. 
              I never imagined my undergraduate research could have such impact.”
            </blockquote>
            <span className="quote-author">— Adebayo Ogunwale, 2025 Research Scholar</span>
            <p className="quote-role">Final Year Nursing Student, University of Ibadan</p>
            </div>
          </div>
        </section>

        {/* Section 4: Values */}
        <section className="values-section">
          <div className="container">
            <SectionHeading 
              eyebrow="Our approach" 
              title="Rooted in people. Focused on progress." 
              centered
            />
            <div className="values-grid">
              <div>
                <Users/>
                <h3>People first</h3>
                <p>We center the lived experiences of communities and the leaders who serve them.</p>
              </div>
              <div>
                <Lightbulb/>
                <h3>Bold thinking</h3>
                <p>We make space for ideas that challenge the status quo and open new possibilities.</p>
              </div>
              <div>
                <HeartHandshake/>
                <h3>Shared power</h3>
                <p>We believe sustainable change is built through collaboration, trust, and mutual accountability.</p>
              </div>
              <div>
                <BookOpen/>
                <h3>Practical learning</h3>
                <p>We turn insight into action with tools leaders can use from day one.</p>
              </div>
            </div>
          </div>
        </section>

        <CTA />
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}