'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import EpisodeCard from './EpisodeCard'

interface Episode {
  id: string
  youtubeId: string
  title: string
  description: string
  episodeNumber: number
  publishedAt: Date
  duration: string
  thumbnailUrl: string
  topics: string[]
  guest?: {
    name: string
    title: string
    company: string
  } | null
}

interface EpisodesGridProps {
  initialEpisodes: Episode[]
}

export default function EpisodesGrid({ initialEpisodes }: EpisodesGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Extract unique topics
  const allTopics = useMemo(() => {
    const topics = new Set<string>()
    initialEpisodes.forEach((episode) => {
      episode.topics.forEach((topic) => topics.add(topic))
    })
    return Array.from(topics).sort()
  }, [initialEpisodes])

  // Filter and sort episodes
  const filteredEpisodes = useMemo(() => {
    let filtered = initialEpisodes.filter((episode) => {
      const matchesSearch =
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.guest?.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTopic =
        selectedTopic === 'all' || episode.topics.includes(selectedTopic)

      return matchesSearch && matchesTopic
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else if (sortBy === 'oldest') {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      } else if (sortBy === 'views') {
        return b.episodeNumber - a.episodeNumber
      }
      return 0
    })

    return filtered
  }, [initialEpisodes, searchQuery, selectedTopic, sortBy])

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search episodes, guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>

        {/* Topic and Sort Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="label-field">
              <Filter className="w-4 h-4 inline mr-2" />
              Filter by Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="input-field"
            >
              <option value="all">All Topics</option>
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="label-field">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="views">Episode Number</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-text-secondary">
        Showing {filteredEpisodes.length} of {initialEpisodes.length} episodes
      </div>

      {/* Episodes Grid */}
      {filteredEpisodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg">
            No episodes found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedTopic('all')
            }}
            className="btn-secondary mt-6"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

