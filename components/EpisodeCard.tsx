import Link from 'next/link'
import { Play, Clock, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface EpisodeCardProps {
  episode: {
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
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link
      href={`/episodes/${episode.youtubeId}`}
      className="group block"
    >
      <div className="card hover:border-accent">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-sm overflow-hidden mb-4 bg-neutral-200">
          <img
            src={episode.thumbnailUrl}
            alt={episode.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white/90 transition-all flex items-center justify-center">
              <Play className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-sm flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {episode.duration}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center text-xs text-text-secondary">
            <span className="font-semibold text-accent">
              Episode {episode.episodeNumber}
            </span>
            <span className="mx-2">•</span>
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(episode.publishedAt), 'MMM dd, yyyy')}
          </div>

          <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
            {episode.title}
          </h3>

          {episode.guest && (
            <div className="text-sm text-text-secondary">
              <div className="font-medium text-text-primary">
                {episode.guest.name}
              </div>
              <div>
                {episode.guest.title} at {episode.guest.company}
              </div>
            </div>
          )}

          <p className="text-sm text-text-secondary line-clamp-2">
            {episode.description}
          </p>

          {episode.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {episode.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-neutral-100 text-xs text-text-secondary rounded-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

