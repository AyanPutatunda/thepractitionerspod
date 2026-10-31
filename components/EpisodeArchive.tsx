'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import type { Episode } from '@/lib/episodes'
import { formatDate } from '@/lib/text'

export function EpisodeArchive({ episodes }: { episodes: Episode[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return episodes
    return episodes.filter((episode) =>
      `${episode.title} ${episode.description}`.toLowerCase().includes(needle)
    )
  }, [episodes, query])

  return (
    <>
      <section
        aria-label="Filter episodes"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px 28px',
          alignItems: 'center',
          paddingBottom: 48,
        }}
      >
        <div className="search-wrap">
          <label htmlFor="ep-search" className="sr-only">
            Search episodes
          </label>
          <MagnifyingGlass size={18} weight="duotone" aria-hidden />
          <input
            id="ep-search"
            className="input"
            type="search"
            placeholder="Search titles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </section>

      {filtered.length > 0 ? (
        <ol className="archive-list">
          {filtered.map((episode) => (
            <li key={episode.slug} className="archive-row">
              <span className="numeral" aria-hidden="true">
                {episode.number}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '68ch' }}>
                <Link className="archive-title" href={`/episodes/${episode.slug}`}>
                  <span className="sr-only">Episode {episode.number}: </span>
                  {episode.title}
                </Link>
                {episode.description ? (
                  <p className="lede" style={{ fontSize: 16, lineHeight: '26px' }}>
                    {episode.description.replace(/\s+/g, ' ').trim().slice(0, 220)}
                  </p>
                ) : null}
                <p className="meta-row">
                  <span>{formatDate(episode.publishedAt)}</span>
                  {episode.durationMinutes ? <span>{episode.durationMinutes} min</span> : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p role="status" className="lede" style={{ paddingBottom: 112 }}>
          No episodes match “{query.trim()}”.{' '}
          <button type="button" className="btn btn-ghost" onClick={() => setQuery('')}>
            Clear search
          </button>
        </p>
      )}
    </>
  )
}
