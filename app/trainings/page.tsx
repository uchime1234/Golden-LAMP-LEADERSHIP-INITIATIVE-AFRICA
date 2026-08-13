import Link from 'next/link'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function TrainingsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero training-hero">
          <div className="container">
            <span className="eyebrow eyebrow-light">GLLIA Learning Lab</span>
            <h1>Learn with purpose. Lead with confidence.</h1>
            <p>Flexible learning experiences for people ready to turn insight into better health outcomes.</p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content">
          <div className="container">
            <SectionHeading 
              eyebrow="Featured learning" 
              title="Practical skills for complex work."
            />
            
            <div className="training-grid">
              {[
                ['Health Leadership Essentials', 'Build a clear leadership practice rooted in purpose and self-awareness.', '6 weeks', images.training],
                ['Influence & Systems Change', 'Navigate complexity, build coalitions, and move ideas into action.', '4 weeks', images.team],
                ['The Mentoring Practice', 'Learn to create spaces where people and possibilities grow.', '3 weeks', images.women]
              ].map(t => (
                <article className="training-card" key={t[0]}>
                  <div className="training-image" style={{backgroundImage:`url(${t[3]})`}}/>
                  <div className="training-body">
                    <span className="eyebrow">Learning Lab</span>
                    <h3>{t[0]}</h3>
                    <p>{t[1]}</p>
                    <div className="training-meta">
                      <span><Clock/> {t[2]}</span>
                      <span><Users/> Small cohort</span>
                    </div>
                    <Link href="/contact" className="text-link">
                      Register interest <ArrowRight size={15}/>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTA title="Make your next move a meaningful one." button="Talk to our team"/>
      <Footer />
    </>
  )
}