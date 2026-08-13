import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function AboutPage() {
  const people = [
    ['Dr. Amina Hassan', 'Founder & Executive Director', images.speaker], 
    ['James Mwangi', 'Programs Director', images.team], 
    ['Dr. Njeri Wambui', 'Learning & Partnerships', images.women], 
    ['Moses Otieno', 'Community Lead', images.community]
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero about-hero">
          <div className="container">
            <span className="eyebrow eyebrow-light">About GLLIA</span>
            <h1>Leadership is the golden lamp that lights the way.</h1>
            <p>
              We are a pan-African community growing the people who will shape 
              healthier systems and communities.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="page-content">
          <div className="container">
            {/* Story Section */}
            <div className="story-grid">
              <div>
                <SectionHeading 
                  eyebrow="Our story" 
                  title="Built from a belief in African leadership." 
                />
                <p className="large-copy">
                  GLLIA began with a simple conviction: the future of health in Africa 
                  will be shaped by leaders who understand their communities, collaborate 
                  across boundaries, and have the courage to imagine better.
                </p>
                <p>
                  Today, we convene a growing network of health professionals, mentors, 
                  educators, and partners who are making that future visible — one 
                  conversation, one cohort, and one bold idea at a time.
                </p>
                <Link href="/contact" className="text-link">
                  Work with us <ArrowRight size={16} />
                </Link>
              </div>
              <div className="story-image" style={{ backgroundImage: `url(${images.community})` }}></div>
            </div>

            {/* Team Section */}
            <div id="team" className="team-section">
              <SectionHeading 
                eyebrow="The people behind the work" 
                title="A community of committed leaders." 
                centered 
              />
              <div className="people-grid">
                {people.map((person) => (
                  <div className="person" key={person[0]}>
                    <div className="person-image" style={{ backgroundImage: `url(${person[2]})` }}></div>
                    <h3>{person[0]}</h3>
                    <p>{person[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <CTA title="There is a place for you in this work." button="Find your place" />
      <Footer />
    </>
  )
}