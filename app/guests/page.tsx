import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Guests of The Practitioners Pod appear here as episodes publish.',
  alternates: { canonical: '/guests' },
}

export default function GuestsPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">The people who ship it</h1>
        </div>
        <p className="dek">Guests appear here as episodes publish.</p>
      </header>
      <section className="glass panel" aria-labelledby="suggest-h" style={{ maxWidth: '40rem' }}>
        <h2 id="suggest-h" className="section-title">
          Know someone who should be here?
        </h2>
        <p className="lede">
          The useful episodes come from a specific story: what was built, and what went wrong along
          the way.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/guest-application">
            Be a guest
          </Link>
        </p>
      </section>
    </div>
  )
}
