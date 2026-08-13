import { ContactBlock, Footer, Header } from '@/components/gllia-site'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow eyebrow-light">Contact GLLIA</span>
            <h1>Let's make health leadership matter.</h1>
            <p>Reach out to explore a partnership, join our community, or ask a question.</p>
          </div>
        </section>
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}