import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The Practitioners Pod is conversations about real implementation, hosted by Ayan Putatunda and published on YouTube.',
  alternates: { canonical: '/about' },
}

const steps = [
  {
    n: '1',
    title: 'A real story',
    body: 'The conversation is about an implementation someone has actually shipped — the decision that was hard, not the diagram that looks finished.',
  },
  {
    n: '2',
    title: 'Recorded remotely',
    body: 'Recorded remotely, then edited for clarity. Published as video on YouTube.',
  },
  {
    n: '3',
    title: 'Notes when they exist',
    body: 'Show notes are added on the episode page from the video description, and expanded when a transcript is ready.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section
        style={{
          padding: 'clamp(48px, 7vw, 96px) 0 72px',
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          maxWidth: '68ch',
        }}
      >
        <span className="kicker">About the show</span>
        <h1 className="display">The Practitioners Pod</h1>
        <p className="dek">
          Conversations with senior practitioners about what actually happened when they shipped the
          work.
        </p>
        <p className="lede">
          The name is the show, not a single format. Episodes are on YouTube. The point is the
          implementation: what ran, what failed, and what changed.
        </p>
      </section>

      <section
        aria-labelledby="host-h"
        style={{
          padding: '0 0 96px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: '62ch',
        }}
      >
        <span className="kicker">The host</span>
        <h2 id="host-h" className="section-title">
          Hosted by <a href={site.hostUrl}>{site.hostName}</a>
        </h2>
        <p className="lede">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <section aria-labelledby="how-h" style={{ padding: '24px 0 112px' }}>
        <h2 id="how-h" className="section-title" style={{ marginBottom: 44 }}>
          How an episode is made
        </h2>
        <ol className="columns-3">
          {steps.map((step) => (
            <li key={step.n} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="step-num" aria-hidden="true">
                {step.n}
              </span>
              <h3 style={{ fontSize: 22, lineHeight: '28px', margin: 0 }}>{step.title}</h3>
              <p className="lede" style={{ fontSize: 16, lineHeight: '26px' }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
