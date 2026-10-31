import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact The Practitioners Pod at ${site.email}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section
      style={{
        padding: 'clamp(48px, 7vw, 96px) 0 112px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <span className="kicker">Contact</span>
      <h1 className="display">Write to the show</h1>
      <p className="dek">
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <ContactForm />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          maxWidth: '62ch',
          paddingTop: 24,
        }}
      >
        <h2 className="section-title">Questions</h2>
        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>Being a guest</h3>
          <p className="lede">
            Use the <Link href="/guest-application">application form</Link>. Include a concrete
            implementation story.
          </p>
        </div>
        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>Recording</h3>
          <p className="lede">Conversations are recorded remotely and published on YouTube.</p>
        </div>
        <div>
          <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>When an episode goes up</h3>
          <p className="lede">
            When it is public on the <a href={site.youtubeUrl}>YouTube channel</a>, it appears on
            this site. There is no fixed release window to quote.
          </p>
        </div>
      </div>
    </section>
  )
}
