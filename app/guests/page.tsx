import Link from 'next/link'
import { Users, ArrowRight, Linkedin, Twitter, ExternalLink } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Guests | The Practitioners Pod',
  description: 'Explore our featured guests - tech leaders and practitioners who have shared their insights on the show.',
}

async function getAllGuests() {
  try {
    const guests = await prisma.guest.findMany({
      include: {
        episodes: {
          orderBy: { publishedAt: 'desc' },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return guests
  } catch (error) {
    console.error('Error fetching guests:', error)
    return []
  }
}

export default async function GuestsPage() {
  const guests = await getAllGuests()

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-primary mb-4">Our Guests</h1>
          <p className="text-xl text-text-secondary max-w-3xl mb-8">
            Tech leaders and practitioners who have shared their insights, experiences, and wisdom on The Practitioners Pod.
          </p>
          <Link href="/apply" className="btn-primary">
            Apply to Be a Guest
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Guests Grid */}
        {guests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guests.map((guest) => (
              <div key={guest.id} id={guest.id} className="card group">
                <div className="flex items-start gap-4 mb-4">
                  {guest.headshotUrl ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                      <img
                        src={guest.headshotUrl}
                        alt={guest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                      <Users className="w-10 h-10 text-neutral-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors mb-1">
                      {guest.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-1">
                      {guest.title}
                    </p>
                    <p className="text-sm font-medium text-accent">
                      {guest.company}
                    </p>
                  </div>
                </div>

                {guest.bio && (
                  <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                    {guest.bio}
                  </p>
                )}

                {guest.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guest.expertise.slice(0, 3).map((exp) => (
                      <span
                        key={exp}
                        className="px-2 py-1 bg-neutral-100 text-xs text-text-secondary rounded-sm"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                <div className="flex items-center gap-3 mb-4">
                  {guest.linkedinUrl && (
                    <a
                      href={guest.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm bg-neutral-100 hover:bg-accent hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {guest.twitterUrl && (
                    <a
                      href={guest.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm bg-neutral-100 hover:bg-accent hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {guest.websiteUrl && (
                    <a
                      href={guest.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm bg-neutral-100 hover:bg-accent hover:text-white transition-colors"
                      aria-label="Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Episodes */}
                {guest.episodes.length > 0 && (
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="text-xs text-text-secondary mb-2">
                      Featured in {guest.episodes.length} episode{guest.episodes.length !== 1 ? 's' : ''}
                    </p>
                    <div className="space-y-2">
                      {guest.episodes.map((episode) => (
                        <Link
                          key={episode.id}
                          href={`/episodes/${episode.youtubeId}`}
                          className="block text-sm text-accent hover:text-accent/80 transition-colors"
                        >
                          Episode {episode.episodeNumber}: {episode.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-6">
              No guests featured yet. Check back soon!
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center card bg-neutral-50">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Want to Be Featured?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            We're always looking for experienced tech practitioners to share their insights and stories. Apply to be a guest on the show.
          </p>
          <Link href="/apply" className="btn-primary">
            Apply to Be a Guest
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

