import Link from 'next/link'
import { Notebook } from '@/components/Notebook'
import { PencilMark } from '@/components/PencilMark'
import { getEpisodes } from '@/lib/episodes'
import { site } from '@/lib/site'
import { excerpt, formatDate } from '@/lib/text'

const pillars = [
  {
    n: '1',
    title: 'The work',
    body: 'What shipped, what broke, and what the team changed. Not a tour of a finished slide.',
  },
  {
    n: '2',
    title: 'The people who did it',
    body: 'Senior data engineers, AI practitioners, and the leads who run the system in production.',
  },
  {
    n: '3',
    title: 'On YouTube',
    body: 'Episodes are published on the show’s YouTube channel. There is no separate audio feed.',
  },
]

export default async function HomePage() {
  const episodes = await getEpisodes()
  const latest = episodes[0]
  const recent = episodes.slice(0, 6)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="meta">
            {latest
              ? `Episode ${latest.number} · ${formatDate(latest.publishedAt)}`
              : 'First episodes coming soon'}
          </p>
          <div className="title-block">
            <h1 id="hero-title" className="display">
              {latest ? (
                <Link className="title-link" href={`/episodes/${latest.slug}`}>
                  {latest.title}
                </Link>
              ) : (
                'Real implementation stories from the people who ship'
              )}
            </h1>
            <PencilMark />
          </div>
          <p className="dek">
            {latest && excerpt(latest.description)
              ? excerpt(latest.description)
              : 'Interviews with senior practitioners about what actually happened when they shipped the work. Published on YouTube.'}
          </p>
          <div className="actions">
            {latest ? (
              <Link className="btn btn-primary" href={`/episodes/${latest.slug}`}>
                Watch the episode
              </Link>
            ) : (
              <a className="btn btn-primary" href={site.youtubeUrl}>
                Subscribe on YouTube
              </a>
            )}
            <Link className="btn btn-secondary" href="/guest-application">
              Be a guest
            </Link>
          </div>
          <p className="facts">
            Hosted by <a href={site.hostUrl}>{site.hostName}</a>
            {' · '}
            Data and AI in production
            {' · '}
            Implementation, not theory
            {' · '}
            No vendor pitches
          </p>
        </div>
        <div className="hero-visual">
          {latest ? (
            <Link href={`/episodes/${latest.slug}`} aria-label={latest.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="episode-still" src={latest.thumbnailUrl} alt="" />
            </Link>
          ) : (
            <Notebook />
          )}
        </div>
      </section>

      <section className="band" aria-labelledby="what-h">
        <h2 id="what-h" className="section-title">
          What the show is
        </h2>
        <ol className="notes">
          {pillars.map((item) => (
            <li key={item.n}>
              <span className="notes-num">{item.n}</span>
              <div>
                <h3>{item.title}</h3>
                <p className="lede">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="band" aria-labelledby="who-h">
        <h2 id="who-h" className="section-title">
          Who it’s for
        </h2>
        <p className="lede">
          People who build data platforms or put models into production. If you want a product
          pitch, this is the wrong show.
        </p>
      </section>

      <section className="band" aria-labelledby="recent-h">
        <h2 id="recent-h" className="section-title">
          Recent episodes
        </h2>
        {recent.length > 0 ? (
          <ol className="episode-grid">
            {recent.map((episode) => (
              <li key={episode.slug}>
                <Link className="episode-link" href={`/episodes/${episode.slug}`}>
                  <span className="numeral" aria-hidden="true">
                    {episode.number}
                  </span>
                  <span>
                    <span className="episode-title">
                      <span className="sr-only">Episode {episode.number}: </span>
                      {episode.title}
                    </span>
                    <span className="meta-row">
                      <span>{formatDate(episode.publishedAt)}</span>
                      {episode.durationMinutes ? <span>{episode.durationMinutes} min</span> : null}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="lede">
            First episodes coming soon. They will show up here when they are public on{' '}
            <a href={site.youtubeUrl}>YouTube</a>.
          </p>
        )}
        <p style={{ marginTop: 24 }}>
          <Link href="/episodes">The full archive</Link>
        </p>
      </section>

      <section className="band" aria-labelledby="guest-cta">
        <h2 id="guest-cta" className="section-title">
          Share an implementation story
        </h2>
        <p className="lede">
          If you have shipped the work and can talk about what actually happened, apply. The
          conversation is remote and the episode is published on YouTube.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/guest-application">
            Apply to be a guest
          </Link>
        </p>
      </section>
    </>
  )
}
