import type { Metadata } from 'next'
import { PencilMark } from '@/components/PencilMark'
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
    <div className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">The Practitioners Pod</h1>
          <PencilMark />
        </div>
        <p className="dek">
          Conversations with senior practitioners about what actually happened when they shipped the
          work.
        </p>
        <p className="lede">
          The name is the show, not a single format. Episodes are on YouTube. The point is the
          implementation: what ran, what failed, and what changed.
        </p>
      </header>

      <section aria-labelledby="host-h" style={{ maxWidth: '40rem' }}>
        <h2 id="host-h" className="section-title">
          Hosted by <a href={site.hostUrl}>{site.hostName}</a>
        </h2>
        <p className="lede">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <section aria-labelledby="how-h">
        <h2 id="how-h" className="section-title">
          How an episode is made
        </h2>
        <ol className="notes">
          {steps.map((step) => (
            <li key={step.n}>
              <span className="notes-num">{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p className="lede">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
