import Link from 'next/link'
import { ArrowRight, YoutubeLogo } from '@phosphor-icons/react/dist/ssr'
import { Misregister } from '@/components/Misregister'
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
        <div className="stack">
          {latest ? (
            <>
              <span className="kicker">
                Latest episode · № {latest.number} · {formatDate(latest.publishedAt)}
              </span>
              <h1 id="hero-title" className="display">
                <Link className="title-link" href={`/episodes/${latest.slug}`}>
                  <Misregister text={latest.title} />
                </Link>
              </h1>
              {excerpt(latest.description) ? (
                <p className="dek">{excerpt(latest.description)}</p>
              ) : null}
            </>
          ) : (
            <>
              <span className="kicker">First episodes coming soon</span>
              <h1 id="hero-title" className="display">
                <Misregister text="Real implementation stories from the people who ship" />
              </h1>
              <p className="dek">
                Interviews with senior practitioners about what actually happened when they shipped
                the work. Published on YouTube.
              </p>
            </>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <a
              className="btn btn-primary"
              href={site.youtubeUrl}
              style={{ minHeight: 44, paddingInline: 16, fontSize: 15 }}
            >
              <YoutubeLogo size={20} weight="duotone" aria-hidden />
              Subscribe on YouTube
            </a>
            <Link
              className="btn btn-secondary"
              href="/guest-application"
              style={{ minHeight: 44, paddingInline: 16, fontSize: 15 }}
            >
              Be a guest
            </Link>
          </div>
        </div>
        {latest ? (
          <figure>
            <Link href={`/episodes/${latest.slug}`} className="title-link">
              <div className="halftone" style={{ aspectRatio: '16 / 9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={latest.thumbnailUrl}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Link>
            <figcaption className="video-note">{latest.title}</figcaption>
          </figure>
        ) : null}
      </section>

      <section aria-label="About the show" style={{ padding: '8px 0 72px' }}>
        <hr className="rule-double" />
        <p className="dateline">
          <span>
            Hosted by <a href={site.hostUrl}>{site.hostName}</a>
          </span>
          <span>Data and AI in production</span>
          <span>Implementation, not theory</span>
          <span>No vendor pitches</span>
        </p>
        <hr className="rule-single" />
      </section>

      <section aria-labelledby="what-h" style={{ padding: '24px 0 96px' }}>
        <h2 id="what-h" className="section-title" style={{ marginBottom: 44 }}>
          What the show is
        </h2>
        <ol className="columns-3">
          {pillars.map((item) => (
            <li key={item.n} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="step-num" aria-hidden="true">
                {item.n}
              </span>
              <h3 style={{ fontSize: 22, lineHeight: '28px', margin: 0 }}>{item.title}</h3>
              <p className="lede" style={{ fontSize: 16, lineHeight: '26px' }}>
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="who-h" style={{ padding: '0 0 96px', maxWidth: '62ch' }}>
        <h2 id="who-h" className="section-title" style={{ marginBottom: 16 }}>
          Who it’s for
        </h2>
        <p className="lede">
          People who build data platforms or put models into production. If you want a product
          pitch, this is the wrong show.
        </p>
      </section>

      <section aria-labelledby="recent-h" style={{ padding: '24px 0 96px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 44,
          }}
        >
          <h2 id="recent-h" className="section-title">
            Recent episodes
          </h2>
          <Link
            href="/episodes"
            style={{ fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            The full archive <ArrowRight size={16} weight="duotone" aria-hidden />
          </Link>
        </div>
        {recent.length > 0 ? (
          <ol className="episode-grid">
            {recent.map((episode) => (
              <li key={episode.slug}>
                <Link className="episode-link" href={`/episodes/${episode.slug}`}>
                  <span className="numeral" aria-hidden="true">
                    {episode.number}
                  </span>
                  <span className="episode-title">
                    <span className="sr-only">Episode {episode.number}: </span>
                    {episode.title}
                  </span>
                  <span
                    className="quiet"
                    style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {formatDate(episode.publishedAt)}
                    {episode.durationMinutes ? ` · ${episode.durationMinutes} min` : ''}
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
      </section>

      <section aria-labelledby="guest-cta" className="split" style={{ padding: '24px 0 112px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="kicker">Be a guest</span>
          <h2 id="guest-cta" className="section-title">
            Share an implementation story
          </h2>
          <p className="lede" style={{ maxWidth: '46ch' }}>
            If you have shipped the work and can talk about what actually happened, apply. The
            conversation is remote and the episode is published on YouTube.
          </p>
        </div>
        <Link
          className="btn btn-primary"
          href="/guest-application"
          style={{ minHeight: 44, width: 'fit-content', paddingInline: 20, fontSize: 15 }}
        >
          Apply to be a guest
        </Link>
      </section>
    </>
  )
}
