import Link from 'next/link'
import { Play, ArrowRight, Users, Mic2, TrendingUp } from 'lucide-react'
import EpisodeCard from '@/components/EpisodeCard'
import NewsletterSignup from '@/components/NewsletterSignup'
import { prisma } from '@/lib/prisma'

async function getLatestEpisodes() {
  try {
    const episodes = await prisma.episode.findMany({
      take: 6,
      orderBy: { publishedAt: 'desc' },
      include: { guest: true },
    })
    return episodes
  } catch (error) {
    console.error('Error fetching episodes:', error)
    return []
  }
}

async function getFeaturedGuests() {
  try {
    const guests = await prisma.guest.findMany({
      take: 6,
      include: { episodes: true },
      where: {
        episodes: {
          some: {},
        },
      },
    })
    return guests
  } catch (error) {
    console.error('Error fetching guests:', error)
    return []
  }
}

async function getStats() {
  try {
    const [episodeCount, guestCount, totalViews] = await Promise.all([
      prisma.episode.count(),
      prisma.guest.count(),
      prisma.episode.aggregate({
        _sum: { viewCount: true },
      }),
    ])

    return {
      episodes: episodeCount,
      guests: guestCount,
      views: totalViews._sum.viewCount || 0,
    }
  } catch (error) {
    return { episodes: 0, guests: 0, views: 0 }
  }
}

export default async function HomePage() {
  const [latestEpisodes, featuredGuests, stats] = await Promise.all([
    getLatestEpisodes(),
    getFeaturedGuests(),
    getStats(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-primary via-primary to-accent">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-white mb-6 text-balance">
              Conversations with Tech Practitioners Who Build the Future
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 mb-10 leading-relaxed max-w-2xl">
              In-depth interviews with industry leaders, exploring the real challenges and innovations shaping technology today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/episodes" className="btn-primary group">
                Listen to Latest Episode
                <Play className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="/apply" className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20">
                Be a Guest
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stats.episodes}+
              </div>
              <div className="text-text-secondary">Episodes Published</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stats.guests}+
              </div>
              <div className="text-text-secondary">Industry Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {(stats.views / 1000).toFixed(0)}K+
              </div>
              <div className="text-text-secondary">Total Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episodes Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-primary mb-4">Latest Episodes</h2>
              <p className="text-text-secondary max-w-2xl">
                Explore our recent conversations with tech leaders and practitioners.
              </p>
            </div>
            <Link
              href="/episodes"
              className="hidden md:inline-flex items-center text-accent hover:text-accent/80 font-medium"
            >
              View All Episodes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {latestEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestEpisodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Mic2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-text-secondary">
                Episodes coming soon. Stay tuned!
              </p>
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link href="/episodes" className="btn-primary">
              View All Episodes
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary mb-6">About The Podcast</h2>
              <p className="text-text-secondary mb-6">
                The Practitioners Pod brings you authentic conversations with the people building the future of technology. We go beyond the surface to explore real challenges, decision-making processes, and lessons learned from years in the trenches.
              </p>
              <p className="text-text-secondary mb-8">
                Our guests are senior practitioners, technical leaders, and founders who have deep hands-on experience. Each episode is a masterclass in practical wisdom.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <Users className="w-10 h-10 text-accent mb-4" />
                <h4 className="text-primary mb-2">Expert Guests</h4>
                <p className="text-sm text-text-secondary">
                  Senior practitioners and technical leaders from top companies
                </p>
              </div>
              <div className="card">
                <Mic2 className="w-10 h-10 text-accent mb-4" />
                <h4 className="text-primary mb-2">Deep Dives</h4>
                <p className="text-sm text-text-secondary">
                  Long-form conversations exploring complex technical topics
                </p>
              </div>
              <div className="card">
                <TrendingUp className="w-10 h-10 text-accent mb-4" />
                <h4 className="text-primary mb-2">Real Insights</h4>
                <p className="text-sm text-text-secondary">
                  Practical wisdom from years of hands-on experience
                </p>
              </div>
              <div className="card">
                <Play className="w-10 h-10 text-accent mb-4" />
                <h4 className="text-primary mb-2">Video Format</h4>
                <p className="text-sm text-text-secondary">
                  All episodes available as video on YouTube
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guests Section */}
      {featuredGuests.length > 0 && (
        <section className="section-spacing">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-primary mb-4">Featured Guests</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Tech leaders and practitioners who have shared their insights on the show.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredGuests.map((guest) => (
                <Link
                  key={guest.id}
                  href={`/guests#${guest.id}`}
                  className="card text-center group hover:border-accent"
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-neutral-200 overflow-hidden">
                    {guest.headshotUrl && (
                      <img
                        src={guest.headshotUrl}
                        alt={guest.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                    {guest.name}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {guest.company}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/guests" className="btn-secondary">
                View All Guests
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="section-spacing bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Stay Updated</h2>
            <p className="text-xl text-neutral-200 mb-10">
              Get notified when new episodes drop and receive exclusive behind-the-scenes content.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-primary mb-6">Want to Share Your Story?</h2>
            <p className="text-xl text-text-secondary mb-10">
              We're always looking for experienced practitioners with unique insights to share. Apply to be a guest on the show.
            </p>
            <Link href="/apply" className="btn-primary text-lg px-10 py-4">
              Apply to Be a Guest
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

