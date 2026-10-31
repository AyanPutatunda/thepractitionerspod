import Link from 'next/link'
import { Play } from 'lucide-react'
import { getEpisodes } from '@/lib/episodes'
import { site } from '@/lib/site'
import { formatDate } from '@/lib/text'
import { youtubeWatchUrl } from '@/lib/youtube'

const offered = [
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
  const watchHref = latest ? youtubeWatchUrl(latest.youtubeId) : site.youtubeUrl

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="meta">
            {latest
              ? `Episode ${latest.number} · ${formatDate(latest.publishedAt)}`
              : 'First episodes coming soon'}
          </p>
          <h1 id="hero-title" className="display">
            Real implementation stories from the people who ship
          </h1>
          <hr className="mark" />
          <p className="dek">
            YouTube interviews with senior data and AI practitioners about what actually happened
            when they shipped the work.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={watchHref}>
              Watch on YouTube
            </a>
            <Link className="btn btn-secondary" href="/guest-application">
              Be a guest
            </Link>
          </div>
          <ul className="facts">
            <li>
              Hosted by <a href={site.hostUrl}>{site.hostName}</a>
            </li>
            <li>Data and AI in production</li>
            <li>Implementation, not theory</li>
            <li>No vendor pitches</li>
          </ul>
        </div>
        <div className="hero-visual">
          {latest ? (
            <Link className="glass still-link" href={`/episodes/${latest.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="episode-still" src={latest.thumbnailUrl} alt="" />
              <span className="sr-only">{latest.title}</span>
            </Link>
          ) : (
            <a className="glass player-plate" href={site.youtubeUrl}>
              <span className="play-mark" aria-hidden="true">
                <Play size={18} strokeWidth={1.5} />
              </span>
              <span className="player-caption">
                <span className="meta">YouTube</span>
                <span className="frame-title">No public episodes yet</span>
                <span className="lede">
                  They will show up here when they are public on the channel.
                </span>
              </span>
            </a>
          )}
        </div>
      </section>

      <section className="band split-panels" aria-label="Who the show is for">
        <div className="glass panel lift">
          <h2 className="section-title">Who it’s for</h2>
          <p className="lede">
            People who build data platforms or put models into production. If you want a product
            pitch, this is the wrong show.
          </p>
        </div>
        <div className="glass panel">
          <h2 className="section-title">What you’ll get</h2>
          <ol className="notes">
            {offered.map((item) => (
              <li key={item.n}>
                <span className="notes-num">{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="lede">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" aria-labelledby="recent-h">
        <h2 id="recent-h" className="section-title">
          Recent episodes
        </h2>
        <div className="glass panel">
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
                        {episode.durationMinutes ? (
                          <span>{episode.durationMinutes} min</span>
                        ) : null}
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
        </div>
      </section>

      <section className="glass panel cta-band" aria-labelledby="guest-cta">
        <h2 id="guest-cta" className="section-title">
          Share an implementation story
        </h2>
        <p className="lede">
          If you have shipped the work and can talk about what actually happened, apply. The
          conversation is remote and the episode is published on YouTube.
        </p>
        <Link className="btn btn-primary" href="/guest-application">
          Apply to be a guest
        </Link>
      </section>
    </>
  )
}
