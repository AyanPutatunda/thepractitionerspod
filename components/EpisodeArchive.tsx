'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
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
      <section className="filters" aria-label="Filter episodes">
        <div className="search-wrap">
          <label htmlFor="ep-search" className="sr-only">
            Search episodes
          </label>
          <Search size={16} strokeWidth={1.5} aria-hidden />
          <input
            id="ep-search"
            className="input"
            type="search"
            placeholder="Search"
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
              <div className="archive-body">
                <Link className="archive-title" href={`/episodes/${episode.slug}`}>
                  <span className="sr-only">Episode {episode.number}: </span>
                  {episode.title}
                </Link>
                {episode.description ? (
                  <p className="lede">
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
        <p role="status" className="lede">
          No episodes match “{query.trim()}”.{' '}
          <button type="button" className="btn btn-ghost" onClick={() => setQuery('')}>
            Clear search
          </button>
        </p>
      )}
    </>
  )
}
