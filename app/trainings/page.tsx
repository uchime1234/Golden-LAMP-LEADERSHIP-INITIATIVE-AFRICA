"use client"

import Link from 'next/link'
import { useState } from 'react'
import { 
  ArrowRight, 
  Clock, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Award, 
  BookOpen, 
  BarChart, 
  FileText, 
  Search, 
  Database, 
  TrendingUp, 
  PenTool, 
  Users as UsersIcon 
} from 'lucide-react'
import { CTA, Footer, Header, SectionHeading, images } from '@/components/gllia-site'

export default function TrainingsPage() {
  const [expandedTraining, setExpandedTraining] = useState<number | null>(null)

  const toggleTraining = (index: number) => {
    setExpandedTraining(expandedTraining === index ? null : index)
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero - WITH BACKGROUND IMAGE */}
        <section 
          className="page-hero training-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,31,65,.92) 0%, rgba(8,31,65,.75) 50%, rgba(8,31,65,.4) 100%), url('/training1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
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
            
            <div className="training-grid-vertical">
              {/* Training 1: Cutting Edge Intensive Challenge */}
              <div className="training-card-vertical" onClick={() => toggleTraining(0)}>
                <div className="training-card-header">
                  <div className="training-card-image" style={{backgroundImage: `url('/training2.jpg')`}}/>
                  <div className="training-card-info">
                    <span className="eyebrow">Intensive Challenge</span>
                    <h3>Cutting Edge Intensive Challenge</h3>
                    <p>An advanced research-development programme for nurses and nursing researchers.</p>
                    <div className="training-meta">
                      <span><Clock size={14}/> 6 Months</span>
                      <span><Users size={14}/> Cohort 1</span>
                    </div>
                  </div>
                  <div className="training-expand-icon">
                    {expandedTraining === 0 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>
                
                {/* Expanded Content - DROPS DOWN VERTICALLY */}
                {expandedTraining === 0 && (
                  <div className="training-expanded-content">
                    <div className="training-expanded-inner">
                      <h4>Programme Overview</h4>
                      <p>
                        The Cutting Edge Intensive Challenge is an advanced research-development programme 
                        designed for nurses and nursing researchers who want to take their skills to the next level.
                      </p>
                      
                      <h5>What You'll Learn</h5>
                      <ul>
                        <li><Search size={16} /> Research Design</li>
                        <li><BarChart size={16} /> Excel for Research</li>
                        <li><Database size={16} /> Data Analysis using SPSS</li>
                        <li><FileText size={16} /> Systematic Reviews</li>
                        <li><PenTool size={16} /> AI-Assisted Research Writing</li>
                        <li><BookOpen size={16} /> Research and Academic Writing</li>
                        <li><TrendingUp size={16} /> Professional Development and Leadership</li>
                        <li><UsersIcon size={16} /> Connecting with Experienced Professionals and Researchers</li>
                      </ul>

                      <div className="training-testimonial">
                        <p>
                          <strong>One participant described it as transformative</strong> because it combined 
                          research knowledge with practical skills and professional networking.
                        </p>
                      </div>

                      <div className="training-cta">
                        <Link href="/contact" className="button button-gold">
                          Register interest <ArrowRight size={16}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Training 2: Cutting Edge Research in Nursing */}
              <div className="training-card-vertical" onClick={() => toggleTraining(1)}>
                <div className="training-card-header">
                  <div className="training-card-image" style={{backgroundImage: `url('/training4.jpg')`}}/>
                  <div className="training-card-info">
                    <span className="eyebrow">Research Mentorship</span>
                    <h3>Cutting Edge Research in Nursing</h3>
                    <p>A 6-week research mentorship programme designed to build nursing research capacity.</p>
                    <div className="training-meta">
                      <span><Clock size={14}/> 6 Weeks</span>
                      <span><Users size={14}/> Cohort 1</span>
                    </div>
                  </div>
                  <div className="training-expand-icon">
                    {expandedTraining === 1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>
                
                {/* Expanded Content - DROPS DOWN VERTICALLY */}
                {expandedTraining === 1 && (
                  <div className="training-expanded-content">
                    <div className="training-expanded-inner">
                      <h4>Programme Overview</h4>
                      <p>
                        This research mentorship programme is specifically designed to build nursing research 
                        capacity. Organized in collaboration with the Nigerian Universities Nursing Students' 
                        Association (NUNSA) National, it takes nursing students and young nurses beyond simply 
                        writing a school research project and helps them understand how research actually works.
                      </p>

                      <h5>The Research Journey</h5>
                      <ul>
                        <li><TrendingUp size={16} /> Identifying a problem</li>
                        <li><Search size={16} /> Developing a research question</li>
                        <li><BookOpen size={16} /> Research design</li>
                        <li><FileText size={16} /> Literature review</li>
                        <li><Database size={16} /> Data collection</li>
                        <li><BarChart size={16} /> Analysis</li>
                        <li><PenTool size={16} /> Interpretation</li>
                        <li><Award size={16} /> Academic writing</li>
                        <li><UsersIcon size={16} /> Communicating findings</li>
                      </ul>

                      <div className="training-testimonial">
                        <p>
                          <strong>Research should help nurses become trailblazers, influence policy, 
                          and transform healthcare systems</strong> — rather than simply completing research 
                          as an academic requirement.
                        </p>
                        <p className="training-source">
                          — GLLIA 2025 Summit
                        </p>
                      </div>

                      <div className="training-cta">
                        <Link href="/contact" className="button button-gold">
                          Register interest <ArrowRight size={16}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Training 3: Evidence-Based Practice Implementation Training */}
              <div className="training-card-vertical" onClick={() => toggleTraining(2)}>
                <div className="training-card-header">
                  <div className="training-card-image" style={{backgroundImage: `url('/training5.jpg')`}}/>
                  <div className="training-card-info">
                    <span className="eyebrow">Implementation Training</span>
                    <h3>Evidence-Based Practice Implementation Training</h3>
                    <p>Equip nurses with practical skills to improve patient care using proven research.</p>
                    <div className="training-meta">
                      <span><Clock size={14}/> 2-31 May 2026</span>
                      <span><Users size={14}/> Cohort 1</span>
                    </div>
                  </div>
                  <div className="training-expand-icon">
                    {expandedTraining === 2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>
                
                {/* Expanded Content - DROPS DOWN VERTICALLY */}
                {expandedTraining === 2 && (
                  <div className="training-expanded-content">
                    <div className="training-expanded-inner">
                      <h4>Programme Overview</h4>
                      <p>
                        This training is organized by GLLIA in collaboration with
                        <strong> Jos University Teaching Hospital (JUTH)</strong>.
                      </p>
                      <p>
                        Its purpose is to equip nurses with practical skills for using research evidence 
                        and real-world strategies to improve patient care.
                      </p>

                      <h5>Programme Goals</h5>
                      <ul>
                        <li><Award size={16} /> Strengthen clinical decision-making</li>
                        <li><FileText size={16} /> Apply the latest evidence in patient care</li>
                        <li><UsersIcon size={16} /> Learn from experienced healthcare professionals</li>
                        <li><Calendar size={16} /> Earn a recognized certificate of participation</li>
                      </ul>

                      <div className="training-highlight">
                        <p>
                          <strong>Moving beyond learning evidence to actually implementing evidence</strong> 
                          in healthcare environments.
                        </p>
                      </div>

                      <div className="training-meta-info">
                        <span className="training-date">
                          <Calendar size={16} /> 2 – 31 May 2026
                        </span>
                        <span className="training-partner">
                          In collaboration with Jos University Teaching Hospital
                        </span>
                      </div>

                      <div className="training-cta">
                        <Link href="/contact" className="button button-gold">
                          Register interest <ArrowRight size={16}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <CTA title="Make your next move a meaningful one." button="Talk to our team"/>
      <Footer />
    </>
  )
}