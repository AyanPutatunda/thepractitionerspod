import { Suspense } from 'react'
import EpisodesGrid from '@/components/EpisodesGrid'
import { Search } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Episodes | The Practitioners Pod',
  description: 'Browse all podcast episodes featuring conversations with tech industry leaders and practitioners.',
}

async function getAllEpisodes() {
  try {
    const episodes = await prisma.episode.findMany({
      orderBy: { publishedAt: 'desc' },
      include: { guest: true },
    })
    return episodes
  } catch (error) {
    console.error('Error fetching episodes:', error)
    return []
  }
}

export default async function EpisodesPage() {
  const episodes = await getAllEpisodes()

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-primary mb-4">All Episodes</h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Explore our complete collection of conversations with tech practitioners and industry leaders.
          </p>
        </div>

        {/* Episodes Grid with Filters */}
        <Suspense fallback={<div className="text-center py-12">Loading episodes...</div>}>
          <EpisodesGrid initialEpisodes={episodes} />
        </Suspense>
      </div>
    </div>
  )
}

