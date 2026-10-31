import type { Metadata } from 'next'
import { EpisodeArchive } from '@/components/EpisodeArchive'
import { getEpisodes } from '@/lib/episodes'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Every episode of The Practitioners Pod. Newest first.',
  alternates: { canonical: '/episodes' },
}

export default async function EpisodesPage() {
  const episodes = await getEpisodes()

  return (
    <>
      <section
        style={{
          padding: 'clamp(48px, 7vw, 96px) 0 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <span className="kicker">
          The archive
          {episodes.length > 0
            ? ` · ${episodes.length} ${episodes.length === 1 ? 'episode' : 'episodes'}`
            : ''}
        </span>
        <h1 className="display">Every episode</h1>
        <p className="dek">Conversations with people who have shipped the work. Newest first.</p>
      </section>
      {episodes.length > 0 ? (
        <EpisodeArchive episodes={episodes} />
      ) : (
        <p className="lede" style={{ paddingBottom: 112 }}>
          First episodes coming soon. They will be listed here when they are public on{' '}
          <a href={site.youtubeUrl}>YouTube</a>.
        </p>
      )}
    </>
  )
}
