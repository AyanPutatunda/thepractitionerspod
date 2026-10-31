import type { Metadata } from 'next'
import Link from 'next/link'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Guests of The Practitioners Pod appear here as episodes publish.',
  alternates: { canonical: '/guests' },
}

export default function GuestsPage() {
  return (
    <>
      <section
        style={{
          padding: 'clamp(48px, 7vw, 96px) 0 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <span className="kicker">Guests</span>
        <h1 className="display">The people who ship it</h1>
        <p className="dek">Guests appear here as episodes publish.</p>
      </section>
      <section
        aria-labelledby="suggest-h"
        style={{
          padding: '0 0 112px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: '60ch',
        }}
      >
        <h2 id="suggest-h" className="section-title">
          Know someone who should be here?
        </h2>
        <p className="lede">
          The useful episodes come from a specific story: what was built, and what went wrong along
          the way.
        </p>
        <Link
          className="btn btn-primary"
          href="/guest-application"
          style={{
            color: 'var(--color-bg)',
            width: 'fit-content',
            minHeight: 44,
            paddingInline: 20,
            fontSize: 15,
          }}
        >
          <EnvelopeSimple size={18} weight="duotone" aria-hidden />
          Be a guest
        </Link>
      </section>
    </>
  )
}
