"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, CalendarDays, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function EventsPage() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/content/events')
        const data = await res.json()
        setEvents(data.filter((e: any) => !e.deleted))
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const toggleEvent = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index)
  }

  // Find the featured event (upcoming) and past events
  const featuredEvent = events.find((e: any) => e.status === 'upcoming' || e.type === 'upcoming')
  const upcomingEvent = events.find((e: any) => e.upcomingImage)
  const pastEvents = events.filter((e: any) => e.type === 'summit' || e.type === 'mentorship' || e.status === 'past')

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
            <SectionHeading eyebrow="What's on" title="Come curious. Leave connected." />

            {/* Featured Event */}
            {featuredEvent && (
              <div className="event-feature">
                <div className="event-feature-image" style={{ backgroundImage: `url('${featuredEvent.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="event-feature-content">
                  <span className="event-date">{featuredEvent.date}</span>
                  <h2>{featuredEvent.title}</h2>
                  <p>{featuredEvent.description}</p>
                  {featuredEvent.description2 && <p>{featuredEvent.description2}</p>}
                  <div className="event-meta">
                    <span><MapPin/> {featuredEvent.location}</span>
                    <span><CalendarDays/> {featuredEvent.applications || 'Applications Open'}</span>
                    {/* ✅ STATUS BADGE */}
                    {featuredEvent.status === 'closed' && (
                      <span className="status-badge closed">APPLICATIONS CLOSED</span>
                    )}
                    {featuredEvent.status === 'past' && (
                      <span className="status-badge past">PAST EVENT</span>
                    )}
                    {featuredEvent.status === 'upcoming' && (
                      <span className="status-badge upcoming">UPCOMING</span>
                    )}
                  </div>
                  {/* ✅ Only show button if NOT closed or past */}
                  {featuredEvent.status !== 'closed' && featuredEvent.status !== 'past' && (
                    <Link href="/contact" className="button button-gold">
                      Register your interest <ArrowRight size={16}/>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div className="section-row upcoming">
              <SectionHeading eyebrow="Keep learning" title="Upcoming gatherings" />
              <Link href="/contact" className="text-link">See all events <ArrowRight size={16}/></Link>
            </div>

            <div className="event-list">
              {upcomingEvent && (
                <div className="event-item expanded-event" onClick={() => toggleEvent(0)}>
                  <div className="event-item-content">
                    <div className="event-item-main">
                      <div className="event-item-image">
                        <img src={upcomingEvent.upcomingImage} alt={upcomingEvent.upcomingTitle} className="event-item-img" />
                      </div>
                      <div className="event-item-info">
                        <strong>{upcomingEvent.upcomingDate || upcomingEvent.date} <small>{upcomingEvent.upcomingDate ? '2026' : ''}</small></strong>
                        <span>
                          <b>{upcomingEvent.upcomingTitle || upcomingEvent.title}</b>
                          <small>{upcomingEvent.upcomingSubtitle || 'Submit your research now'}</small>
                        </span>
                        {/* ✅ STATUS BADGE */}
                        {upcomingEvent.status === 'closed' && (
                          <span className="status-badge closed">CLOSED</span>
                        )}
                        {upcomingEvent.status === 'upcoming' && (
                          <span className="status-badge upcoming">UPCOMING</span>
                        )}
                        <div className="event-expand-icon">
                          {expandedEvent === 0 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>
                    {expandedEvent === 0 && (
                      <div className="event-expanded-content">
                        <div className="event-expanded-inner">
                          <h4>{upcomingEvent.host || 'Hosted by Golden Lamp Leadership Initiative Africa'}</h4>
                          <p>{upcomingEvent.description}</p>
                          {upcomingEvent.description2 && <p>{upcomingEvent.description2}</p>}
                          <p>{upcomingEvent.buildingText || 'Building on the success of previous editions, GLLIA is bringing together talented nursing students, academic supervisors, nursing educators, researchers, and healthcare leaders for a platform dedicated to advancing evidence-based nursing practice.'}</p>

                          <h5>What to Expect</h5>
                          <ul>
                            {upcomingEvent.whatToExpect && upcomingEvent.whatToExpect.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>

                          <h5>Who Can Participate?</h5>
                          <p>{upcomingEvent.whoCanParticipate || 'The challenge is designed primarily for undergraduate nursing students, particularly final-year students with completed or substantially developed research projects.'}</p>
                          <p>Participating institutions can also compete for recognition based on the quality and performance of their students' research submissions.</p>

                          <h5>Why It Matters</h5>
                          <p>{upcomingEvent.whyItMatters || 'Nursing research plays an important role in improving patient care, strengthening clinical practice, influencing healthcare policy, and addressing healthcare challenges. GLLIA\'s research initiative was created to help strengthen research capacity among young nurses and encourage them to become evidence-driven healthcare professionals and future leaders.'}</p>
                          <p>{upcomingEvent.previousEditions || 'Previous editions have attracted students from universities across Nigeria and have recognized exceptional student researchers and institutions.'}</p>

                          <div className="event-cta">
                            <span className="event-badge">{upcomingEvent.badge || upcomingEvent.date}</span>
                            <p className="event-closing">{upcomingEvent.closing || 'Come and celebrate the next generation of nursing researchers and leaders as they transform research into ideas, evidence, and impact.'}</p>
                            <div className="event-host">
                              <strong>{upcomingEvent.upcomingTitle || upcomingEvent.title}</strong>
                              <span>{upcomingEvent.host || 'Hosted by Golden Lamp Leadership Initiative Africa'}</span>
                            </div>
                          </div>
                          {/* ✅ Only show Register button if NOT closed */}
                          {upcomingEvent.status !== 'closed' && (
                            <div className="training-cta">
                              <Link href="/contact" className="button button-gold">
                                Register interest <ArrowRight size={16}/>
                              </Link>
                            </div>
                          )}
                          {upcomingEvent.status === 'closed' && (
                            <div className="training-closed-message">
                              <p>Applications are currently closed. Check back later!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PAST EVENTS SECTION */}
            <div className="past-events-section">
              <SectionHeading eyebrow="Past Events" title="Our Previous Summits & Awards" copy="Celebrating excellence in nursing research and leadership across Africa." />

              <div className="past-events-grid">
                {pastEvents.map((event: any, index: number) => (
                  <div key={event.id} className="past-event-card">
                    <div className="past-event-image">
                      <img src={event.image} alt={event.title} />
                    </div>
                    <div className="past-event-content">
                      <span className="past-event-year">{event.year}</span>
                      <h3>{event.title}</h3>
                      <p className="past-event-location"><MapPin size={16} /> {event.location}</p>
                      <p className="past-event-description">{event.description}</p>
                      {event.theme && (
                        <div className="past-event-theme">
                          <strong>Theme:</strong> "{event.theme}"
                        </div>
                      )}
                      {event.stats && (
                        <div className="past-event-stats">
                          <span><strong>{event.stats.submissions}</strong> Research Submissions</span>
                          <span><strong>{event.stats.universities}</strong> Universities</span>
                        </div>
                      )}
                      {event.stats?.students && (
                        <div className="past-event-stats">
                          <span><strong>{event.stats.students}</strong> Students</span>
                          <span><strong>{event.stats.weeks}</strong> Weeks</span>
                        </div>
                      )}
                      {/* ✅ PAST EVENT BADGE */}
                      <span className="status-badge past">PAST EVENT</span>
                      {event.participatingUniversities && (
                        <button className="past-event-toggle" onClick={() => toggleEvent(index + 1)}>
                          {expandedEvent === index + 1 ? 'Show less' : 'Learn more'}
                        </button>
                      )}
                      {expandedEvent === index + 1 && event.participatingUniversities && (
                        <div className="past-event-details">
                          <h4>Participating Universities</h4>
                          <ul>
                            {event.participatingUniversities.map((uni: string, i: number) => (
                              <li key={i}>{uni}</li>
                            ))}
                          </ul>

                          {event.winners && (
                            <>
                              <h4>Winners</h4>
                              <div className="winners-list">
                                {event.winners.map((winner: any, i: number) => (
                                  <div key={i} className={`winner ${winner.class}`}>
                                    <span className="winner-place">{winner.place}</span>
                                    <span className="winner-name">{winner.name}</span>
                                    <span className="winner-school">{winner.school}</span>
                                    {winner.prize && <span className="winner-prize">{winner.prize}</span>}
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          {event.extra && <div className="winner-extra"><p>{event.extra}</p></div>}
                          {event.mentorship && <><h4>Research Mentorship Programme</h4><p>{event.mentorship}</p></>}
                          {event.otherInitiatives && (
                            <>
                              <h4>Other Initiatives</h4>
                              <ul>
                                {event.otherInitiatives.map((item: string, i: number) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          {event.venue && <div className="event-venue"><strong>Venue:</strong> {event.venue}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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