"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CalendarDays, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function EventsPage() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const toggleEvent = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index)
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero - WITH BACKGROUND IMAGE */}
        <section 
          className="page-hero events-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('/events1.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container">
            <span className="eyebrow eyebrow-light">Events & Summit</span>
            <h1>Where ideas meet action.</h1>
            <p>Gatherings for the people building Africa's next chapter in health.</p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content">
          <div className="container">
            <SectionHeading 
              eyebrow="What's on" 
              title="Come curious. Leave connected."
            />

            {/* Featured Event - WITH IMAGE ON LEFT */}
            <div className="event-feature">
              <div 
                className="event-feature-image" 
                style={{
                  backgroundImage: `url('/events2.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="event-feature-content">
                <span className="event-date">31 October 2026</span>
                <h2>2026 Undergraduate Nursing Research Challenge</h2>
                <p>
                  The 2026 Undergraduate Nursing Research Challenge is a national research competition 
                  organized by Golden Lamp Leadership Initiative Africa (GLLIA) to celebrate excellence, 
                  innovation, and leadership among undergraduate nursing students.
                </p>
                <p>
                  The challenge provides an opportunity for emerging nurses to showcase outstanding 
                  research projects, gain recognition for their academic work, and contribute innovative 
                  ideas toward improving healthcare and nursing practice in Africa.
                </p>
                <div className="event-meta">
                  <span><MapPin/> Ibadan, Nigeria</span>
                  <span><CalendarDays/> Applications Closed</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events - UPDATED */}
            <div className="section-row upcoming">
              <SectionHeading 
                eyebrow="Keep learning" 
                title="Upcoming gatherings"
              />
              <Link href="/contact" className="text-link">
                See all events <ArrowRight size={16}/>
              </Link>
            </div>

            <div className="event-list">
              {/* Event 1: Undergraduate Nursing Research Challenge */}
              <div className="event-item expanded-event" onClick={() => toggleEvent(0)}>
                <div className="event-item-content">
                  <div className="event-item-main">
                    <div className="event-item-image">
                      <img 
                        src="/events4.png" 
                        alt="Undergraduate Nursing Research Challenge" 
                        className="event-item-img"
                      />
                    </div>
                    <div className="event-item-info">
                      <strong>31 Oct <small>2026</small></strong>
                      <span>
                        <b>Undergraduate Nursing Research Challenge</b>
                        <small>Submit your research now</small>
                      </span>
                      <div className="event-expand-icon">
                        {expandedEvent === 0 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {expandedEvent === 0 && (
                    <div className="event-expanded-content">
                      <div className="event-expanded-inner">
                        <h4>Hosted by Golden Lamp Leadership Initiative Africa</h4>
                        <p>
                          The 2026 Undergraduate Nursing Research Challenge is a national research competition 
                          organized by Golden Lamp Leadership Initiative Africa (GLLIA) to celebrate excellence, 
                          innovation, and leadership among undergraduate nursing students.
                        </p>
                        <p>
                          The challenge provides an opportunity for emerging nurses to showcase outstanding 
                          research projects, gain recognition for their academic work, and contribute innovative 
                          ideas toward improving healthcare and nursing practice in Africa.
                        </p>
                        <p>
                          Building on the success of previous editions, GLLIA is bringing together talented 
                          nursing students, academic supervisors, nursing educators, researchers, and healthcare 
                          leaders for a platform dedicated to advancing evidence-based nursing practice.
                        </p>

                        <h5>What to Expect</h5>
                        <ul>
                          <li>Outstanding Undergraduate Nursing Research</li>
                          <li>Student Research Presentations</li>
                          <li>Best Research Project Awards</li>
                          <li>Best Student Recognition</li>
                          <li>School/Institution Recognition</li>
                          <li>Supervisor Recognition</li>
                          <li>Networking with Nursing Leaders and Researchers</li>
                          <li>Mentorship and Research Opportunities</li>
                        </ul>

                        <h5>Who Can Participate?</h5>
                        <p>
                          The challenge is designed primarily for undergraduate nursing students, particularly 
                          final-year students with completed or substantially developed research projects.
                        </p>
                        <p>
                          Participating institutions can also compete for recognition based on the quality and 
                          performance of their students' research submissions.
                        </p>

                        <h5>Why It Matters</h5>
                        <p>
                          Nursing research plays an important role in improving patient care, strengthening 
                          clinical practice, influencing healthcare policy, and addressing healthcare challenges. 
                          GLLIA's research initiative was created to help strengthen research capacity among 
                          young nurses and encourage them to become evidence-driven healthcare professionals 
                          and future leaders.
                        </p>
                        <p>
                          Previous editions have attracted students from universities across Nigeria and have 
                          recognized exceptional student researchers and institutions.
                        </p>

                        <div className="event-cta">
                          <span className="event-badge">31 October 2026</span>
                          <p className="event-closing">
                            Come and celebrate the next generation of nursing researchers and leaders as they 
                            transform research into ideas, evidence, and impact.
                          </p>
                          <div className="event-host">
                            <strong>2026 Undergraduate Nursing Research Challenge</strong>
                            <span>Hosted by Golden Lamp Leadership Initiative Africa</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PAST EVENTS SECTION */}
            <div className="past-events-section">
              <SectionHeading 
                eyebrow="Past Events" 
                title="Our Previous Summits & Awards"
                copy="Celebrating excellence in nursing research and leadership across Africa."
              />

              <div className="past-events-grid">
                {/* 2025 Summit - event6 */}
                <div className="past-event-card">
                  <div className="past-event-image">
                    <img src="/events6.jpg" alt="2025 Summit and Awards" />
                  </div>
                  <div className="past-event-content">
                    <span className="past-event-year">2025</span>
                    <h3>Undergraduate Nursing Research Summit & Awards</h3>
                    <p className="past-event-location"><MapPin size={16} /> Ikeja, Lagos, Nigeria</p>
                    <p className="past-event-description">
                      The second edition of the annual Undergraduate Nursing Research Summit and Award 
                      ceremony focused on strengthening research among undergraduate nursing students in Nigeria.
                    </p>
                    <div className="past-event-theme">
                      <strong>Theme:</strong> "From Basics to Cutting Edge: Advancing Nursing Through Research"
                    </div>
                    <div className="past-event-stats">
                      <span><strong>63</strong> Research Submissions</span>
                      <span><strong>10</strong> Universities</span>
                    </div>
                    <button className="past-event-toggle" onClick={() => toggleEvent(1)}>
                      {expandedEvent === 1 ? 'Show less' : 'Learn more'}
                    </button>
                    {expandedEvent === 1 && (
                      <div className="past-event-details">
                        <h4>Participating Universities</h4>
                        <ul>
                          <li>Redeemer's University</li>
                          <li>Obafemi Awolowo University</li>
                          <li>University of Benin</li>
                          <li>Achievers University</li>
                          <li>University of Ibadan</li>
                          <li>and others</li>
                        </ul>

                        <h4>2025 Winners</h4>
                        <div className="winners-list">
                          <div className="winner gold">
                            <span className="winner-place">🏆 1st Place</span>
                            <span className="winner-name">Victor Saliu</span>
                            <span className="winner-school">Redeemer's University</span>
                            <span className="winner-prize">₦2,000,000</span>
                          </div>
                          <div className="winner silver">
                            <span className="winner-place">🥈 2nd Place</span>
                            <span className="winner-name">Okeagbo Mary Omolola</span>
                            <span className="winner-school">Obafemi Awolowo University</span>
                          </div>
                          <div className="winner bronze">
                            <span className="winner-place">🥉 3rd Place</span>
                            <span className="winner-name">Uba Paul-Silas</span>
                            <span className="winner-school">Redeemer's University</span>
                            <span className="winner-prize">₦250,000</span>
                          </div>
                        </div>
                        <div className="winner-extra">
                          <p><strong>Redeemer's University</strong> also received a ₦1,000,000 departmental award.</p>
                        </div>

                        <h4>Research Mentorship Programme</h4>
                        <p>
                          An eight-week research mentorship programme ran from December 2024 to February 2025, 
                          involving lecturers from Nigeria and abroad volunteering to mentor students online. 
                          The programme attracted <strong>138 students</strong> from universities across Nigeria.
                        </p>

                        <h4>Other 2025 Initiatives</h4>
                        <ul>
                          <li>Sponsored a faculty member to attend an international research conference in Senegal</li>
                          <li>Supported students through an essay competition</li>
                          <li>Worked with universities to identify strengths and weaknesses in students' research competence</li>
                        </ul>

                        <div className="event-venue">
                          <strong>Venue:</strong> LTV Combo Hall, Ikeja, Lagos
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2024 Summit - event7 */}
                <div className="past-event-card">
                  <div className="past-event-image">
                    <img src="/events7.jpg" alt="2024 Summit and Awards" />
                  </div>
                  <div className="past-event-content">
                    <span className="past-event-year">2024</span>
                    <h3>Undergraduate Nursing Research Summit & Awards</h3>
                    <p className="past-event-location"><MapPin size={16} /> Alagbaka, Akure, Nigeria</p>
                    <p className="past-event-description">
                      The inaugural edition of the Undergraduate Nursing Research Summit and Award ceremony 
                      that launched GLLIA's commitment to advancing nursing research in Nigeria.
                    </p>
                    <div className="past-event-stats">
                      <span><strong>40+</strong> Research Submissions</span>
                      <span><strong>8</strong> Universities</span>
                    </div>
                  </div>
                </div>

                {/* Research Mentorship Programme - event8 */}
                <div className="past-event-card">
                  <div className="past-event-image">
                    <img src="/events8.jpg" alt="Research Mentorship Programme" />
                  </div>
                  <div className="past-event-content">
                    <span className="past-event-year">2024-2025</span>
                    <h3>Research Mentorship Programme</h3>
                    <p className="past-event-description">
                      An eight-week online mentorship programme that attracted 138 students from universities 
                      across Nigeria, taking them through academic research with guidance from lecturers 
                      from Nigeria and abroad.
                    </p>
                    <div className="past-event-stats">
                      <span><strong>138</strong> Students</span>
                      <span><strong>8</strong> Weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <CTA title="Bring your perspective to the room." button="Get event updates"/>
      <Footer />
    </>
  )
}