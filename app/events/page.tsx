import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow eyebrow-light">Events & summit</span>
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

            {/* Featured Event */}
            <div className="event-feature">
              <div className="event-feature-image" style={{backgroundImage:`url(${images.speaker})`}}/>
              <div className="event-feature-content">
                <span className="event-date">12–14 September 2025</span>
                <h2>GLLIA Health Leadership Summit</h2>
                <p>
                  Three days of honest conversations, practical workshops, and new partnerships 
                  for leaders ready to make health systems work better.
                </p>
                <div className="event-meta">
                  <span><MapPin/> Nairobi, Kenya</span>
                  <span><CalendarDays/> Applications open</span>
                </div>
                <Link href="/contact" className="button button-gold">
                  Register your interest <ArrowRight size={16}/>
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
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
              {[
                ['18 Jun', 'Leading through uncertainty', 'Virtual conversation · 60 min'],
                ['02 Jul', 'Community health in practice', 'Nairobi · Half-day workshop'],
                ['24 Jul', 'Mentor circle: Building influence', 'Virtual · GLLIA community']
              ].map(e => (
                <div className="event-item" key={e[0]}>
                  <strong>{e[0].split(' ')[0]}<small>{e[0].split(' ')[1]}</small></strong>
                  <span><b>{e[1]}</b><small>{e[2]}</small></span>
                  <ArrowRight/>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTA title="Bring your perspective to the room." button="Get event updates"/>
      <Footer />
    </>
  )
}