import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { CTA, Footer, Header, InitiativeCard, SectionHeading, images } from '@/components/gllia-site'

export default function InitiativesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow eyebrow-light">Our initiatives</span>
            <h1>Turning potential into progress.</h1>
            <p>Programs designed to grow courageous, connected, and capable health leaders across Africa.</p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content">
          <div className="container">
            <SectionHeading 
              eyebrow="Our portfolio" 
              title="Three pathways. One shared purpose." 
              copy="Each initiative is built around the realities leaders face — and the change they are ready to make."
            />
            
            <div className="initiative-grid large-grid">
              <InitiativeCard 
                tag="Fellowship" 
                title="Emerging Leaders Fellowship" 
                copy="A 12-month experience combining leadership practice, mentorship, and a community of peers." 
                image={images.team}
              />
              <InitiativeCard 
                tag="Movement" 
                title="Health Changemakers" 
                copy="A platform for people turning local insight into bold, community-led health solutions." 
                image={images.community}
              />
              <InitiativeCard 
                tag="Learning Lab" 
                title="GLLIA Learning Lab" 
                copy="Short courses, workshops, and tools for leaders navigating complex health challenges." 
                image={images.training}
              />
            </div>

            {/* Feature Section */}
            <div className="feature-row">
              <div>
                <span className="eyebrow">What participants gain</span>
                <h2>Leadership is a practice, not a position.</h2>
                <p>
                  Our programs help participants develop the clarity, confidence, and relationships 
                  to lead change in their own context.
                </p>
                <Link href="/trainings" className="button button-gold">
                  Explore trainings <ArrowRight size={16}/>
                </Link>
              </div>
              <ul>
                {[
                  'A trusted peer community across Africa',
                  'One-to-one mentorship from experienced leaders',
                  'Practical tools for strategy, influence, and wellbeing',
                  'Platforms to share ideas and scale impact'
                ].map(x => (
                  <li key={x}><CheckCircle2/> {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <CTA title="Your leadership can move health forward." button="Join the movement"/>
      <Footer />
    </>
  )
}