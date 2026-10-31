import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { PencilMark } from '@/components/PencilMark'
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
  const meta = [
    `Episode ${episode.number}`,
    formatDate(episode.publishedAt),
    episode.durationMinutes ? `${episode.durationMinutes} min` : '',
    episode.viewCount != null ? `${formatViews(episode.viewCount)} views` : '',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="page" aria-labelledby="ep-title">
      <header className="page-intro">
        <Link
          href="/episodes"
          className="meta"
          style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
          All episodes
        </Link>
        <p className="meta">{meta}</p>
        <div className="title-block">
          <h1 id="ep-title" className="display-sm">
            {episode.title}
          </h1>
          <PencilMark />
        </div>
        {excerpt(episode.description) ? (
          <p className="dek">{excerpt(episode.description)}</p>
        ) : null}
      </header>

      <YouTubeEmbed videoId={episode.youtubeId} title={episode.title} />

      <div className="prose">
        <h2>Show notes</h2>
        {episode.description ? (
          <Prose text={episode.description} />
        ) : (
          <p className="lede">No description was published with this video.</p>
        )}
        <p>
          <a href={youtubeWatchUrl(episode.youtubeId)}>Watch on YouTube</a>
        </p>
      </div>

      {previous || next ? (
        <nav className="neighbors" aria-label="More episodes">
          {previous ? (
            <Link href={`/episodes/${previous.slug}`} className="neighbor">
              <span className="meta">Previous · Episode {previous.number}</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/episodes/${next.slug}`} className="neighbor">
              <span className="meta">Next · Episode {next.number}</span>
              <strong>{next.title}</strong>
            </Link>
          ) : null}
        </nav>
      ) : null}

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
