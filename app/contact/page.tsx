import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { PencilMark } from '@/components/PencilMark'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact The Practitioners Pod at ${site.email}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">Write to the show</h1>
          <PencilMark />
        </div>
        <p className="dek">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </header>
      <ContactForm />
      <section aria-labelledby="questions-h" style={{ maxWidth: '40rem' }}>
        <h2 id="questions-h" className="section-title">
          Questions
        </h2>
        <div className="notes">
          <div>
            <h3>Being a guest</h3>
            <p className="lede">
              Use the <Link href="/guest-application">application form</Link>. Include a concrete
              implementation story.
            </p>
          </div>
          <div>
            <h3>Recording</h3>
            <p className="lede">Conversations are recorded remotely and published on YouTube.</p>
          </div>
          <div>
            <h3>When an episode goes up</h3>
            <p className="lede">
              When it is public on the <a href={site.youtubeUrl}>YouTube channel</a>, it appears on
              this site. There is no fixed release window to quote.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
