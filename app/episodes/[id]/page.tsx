import { notFound } from 'next/navigation'
import { Calendar, Clock, Share2, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import YouTubePlayer from '@/components/YouTubePlayer'
import EpisodeCard from '@/components/EpisodeCard'

interface EpisodePageProps {
  params: {
    id: string
  }
}

async function getEpisode(youtubeId: string) {
  try {
    const episode = await prisma.episode.findUnique({
      where: { youtubeId },
      include: { guest: true },
    })
    return episode
  } catch (error) {
    return null
  }
}

async function getRelatedEpisodes(currentEpisodeId: string, topics: string[]) {
  try {
    const episodes = await prisma.episode.findMany({
      where: {
        id: { not: currentEpisodeId },
        topics: {
          hasSome: topics,
        },
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      include: { guest: true },
    })
    return episodes
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: EpisodePageProps) {
  const episode = await getEpisode(params.id)

  if (!episode) {
    return {
      title: 'Episode Not Found',
    }
  }

  return {
    title: `${episode.title} | The Practitioners Pod`,
    description: episode.description,
    openGraph: {
      title: episode.title,
      description: episode.description,
      images: [episode.thumbnailUrl],
    },
  }
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const episode = await getEpisode(params.id)

  if (!episode) {
    notFound()
  }

  const relatedEpisodes = await getRelatedEpisodes(episode.id, episode.topics)

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          href="/episodes"
          className="inline-flex items-center text-text-secondary hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Episodes
        </Link>

        {/* Video Section */}
        <div className="max-w-5xl mx-auto">
          <YouTubePlayer videoId={episode.youtubeId} />

          {/* Episode Info */}
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
              <span className="font-semibold text-accent">
                Episode {episode.episodeNumber}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(episode.publishedAt), 'MMMM dd, yyyy')}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {episode.duration}
              </span>
              <span>{episode.viewCount.toLocaleString()} views</span>
            </div>

            <h1 className="text-primary mb-6">{episode.title}</h1>

            {episode.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {episode.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-neutral-100 text-sm text-text-secondary rounded-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Guest Info */}
            {episode.guest && (
              <div className="card mb-8">
                <div className="flex items-start gap-6">
                  {episode.guest.headshotUrl && (
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                      <img
                        src={episode.guest.headshotUrl}
                        alt={episode.guest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {episode.guest.name}
                    </h3>
                    <p className="text-text-secondary mb-3">
                      {episode.guest.title} at {episode.guest.company}
                    </p>
                    {episode.guest.bio && (
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {episode.guest.bio}
                      </p>
                    )}
                    {(episode.guest.linkedinUrl || episode.guest.twitterUrl) && (
                      <div className="flex gap-4 mt-4">
                        {episode.guest.linkedinUrl && (
                          <a
                            href={episode.guest.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 text-sm font-medium"
                          >
                            LinkedIn
                          </a>
                        )}
                        {episode.guest.twitterUrl && (
                          <a
                            href={episode.guest.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 text-sm font-medium"
                          >
                            Twitter
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                About This Episode
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {episode.description}
              </p>
            </div>

            {/* Show Notes */}
            {episode.showNotes && (
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Show Notes
                </h3>
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: episode.showNotes }}
                  />
                </div>
              </div>
            )}

            {/* Transcript */}
            {episode.transcript && (
              <details className="mb-8">
                <summary className="text-2xl font-semibold text-primary mb-4 cursor-pointer hover:text-accent transition-colors">
                  Transcript
                </summary>
                <div className="mt-4 p-6 bg-neutral-50 rounded-sm">
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                    {episode.transcript}
                  </p>
                </div>
              </details>
            )}

            {/* Share Button */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: episode.title,
                    text: episode.description,
                    url: window.location.href,
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }
              }}
              className="btn-secondary"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Episode
            </button>
          </div>
        </div>

        {/* Related Episodes */}
        {relatedEpisodes.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-semibold text-primary mb-8">
              Related Episodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedEpisodes.map((relatedEpisode) => (
                <EpisodeCard key={relatedEpisode.id} episode={relatedEpisode} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

