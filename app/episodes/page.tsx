import type { Metadata } from 'next'
import { EpisodeArchive } from '@/components/EpisodeArchive'
import { PencilMark } from '@/components/PencilMark'
import { getEpisodes } from '@/lib/episodes'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Every episode of The Practitioners Pod. Newest first.',
  alternates: { canonical: '/episodes' },
}

export default async function EpisodesPage() {
  const episodes = await getEpisodes()
  const count =
    episodes.length > 0
      ? `${episodes.length} ${episodes.length === 1 ? 'episode' : 'episodes'}`
      : null

  return (
    <div className="page">
      <header className="page-intro">
        {count ? <p className="meta">{count}</p> : null}
        <div className="title-block">
          <h1 className="display">Every episode</h1>
          <PencilMark />
        </div>
        <p className="dek">Conversations with people who have shipped the work. Newest first.</p>
      </header>
      {episodes.length > 0 ? (
        <EpisodeArchive episodes={episodes} />
      ) : (
        <p className="lede">
          First episodes coming soon. They will be listed here when they are public on{' '}
          <a href={site.youtubeUrl}>YouTube</a>.
        </p>
      )}
    </div>
  )
}
