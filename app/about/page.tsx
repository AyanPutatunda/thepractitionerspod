import type { Metadata } from 'next'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { site, siteUrl } from '@/lib/site'

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

      <section className="glass panel host" aria-labelledby="host-h">
        <a className="host-portrait" href={site.hostUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src="/images/ayan-putatunda.jpg"
            alt="Ayan Putatunda, host of The Practitioners Pod"
            width={935}
            height={1198}
            sizes="(max-width: 800px) 240px, 280px"
            style={{ width: '100%', height: 'auto' }}
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <div className="host-copy">
          <h2 id="host-h" className="section-title">
            {site.hostName}
          </h2>
          <p className="lede">Host, The Practitioners Pod</p>
          <p className="lede">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <a
            className="btn btn-primary"
            href={site.hostUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit ayanputatunda.com <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: site.hostName,
          url: site.hostUrl,
          image: `${siteUrl()}/images/ayan-putatunda.jpg`,
        }}
      />

      <section className="glass panel" aria-labelledby="how-h">
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
