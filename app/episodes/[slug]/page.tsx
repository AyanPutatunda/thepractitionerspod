import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { JsonLd } from '@/components/JsonLd'
import { Prose } from '@/components/Prose'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { episodeNeighbors, getEpisode, getEpisodes } from '@/lib/episodes'
import { siteUrl } from '@/lib/site'
import { excerpt, formatDate, formatViews } from '@/lib/text'
import { youtubeEmbedUrl, youtubeWatchUrl } from '@/lib/youtube'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map((episode) => ({ slug: episode.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const episode = await getEpisode(slug)
  if (!episode) return { title: 'Episode' }
  const description = excerpt(episode.description) || episode.title
  return {
    title: episode.title,
    description,
    alternates: { canonical: `/episodes/${episode.slug}` },
    openGraph: {
      title: episode.title,
      description,
      type: 'video.other',
      images: [episode.thumbnailUrl],
    },
  }
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params
  const episodes = await getEpisodes()
  const episode = episodes.find((item) => item.slug === slug)
  if (!episode) notFound()
  const { previous, next } = episodeNeighbors(episodes, slug)
  const description = excerpt(episode.description, 500) || episode.title
  const pageUrl = `${siteUrl()}/episodes/${episode.slug}`

  return (
    <article aria-labelledby="ep-title">
      <header
        style={{
          padding: 'clamp(40px, 6vw, 80px) 0 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          maxWidth: 900,
        }}
      >
        <Link
          href="/episodes"
          style={{
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            width: 'fit-content',
          }}
        >
          <ArrowLeft size={16} weight="duotone" aria-hidden />
          All episodes
        </Link>
        <span className="kicker">
          № {episode.number}
          {formatDate(episode.publishedAt) ? ` · ${formatDate(episode.publishedAt)}` : ''}
          {episode.durationMinutes ? ` · ${episode.durationMinutes} min` : ''}
          {episode.viewCount != null ? ` · ${formatViews(episode.viewCount)} views` : ''}
        </span>
        <h1 id="ep-title" className="display-sm">
          {episode.title}
        </h1>
        {excerpt(episode.description) ? (
          <p className="dek">{excerpt(episode.description)}</p>
        ) : null}
      </header>

      <YouTubeEmbed videoId={episode.youtubeId} title={episode.title} />

      <div style={{ padding: '72px 0 104px', maxWidth: '68ch' }}>
        <h2 style={{ fontSize: 24, lineHeight: '30px', margin: '0 0 24px' }}>Show notes</h2>
        {episode.description ? (
          <Prose text={episode.description} />
        ) : (
          <p className="lede">No description was published with this video.</p>
        )}
        <p style={{ marginTop: 28 }}>
          <a href={youtubeWatchUrl(episode.youtubeId)}>Watch on YouTube</a>
        </p>
      </div>

      <nav
        aria-label="More episodes"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '32px 64px',
          paddingBottom: 112,
        }}
      >
        {previous ? (
          <Link
            href={`/episodes/${previous.slug}`}
            className="title-link"
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            <span className="kicker">← Previous · № {previous.number}</span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 22,
                lineHeight: '28px',
              }}
            >
              {previous.title}
            </span>
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/episodes/${next.slug}`}
            className="title-link"
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            <span className="kicker">Next · № {next.number} →</span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 22,
                lineHeight: '28px',
              }}
            >
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: episode.title,
          description,
          thumbnailUrl: episode.thumbnailUrl,
          uploadDate: episode.publishedAt,
          embedUrl: youtubeEmbedUrl(episode.youtubeId),
          url: pageUrl,
          ...(episode.durationMinutes ? { duration: `PT${episode.durationMinutes}M` } : {}),
        }}
      />
    </article>
  )
}
