import type { MetadataRoute } from 'next'
import { getEpisodes } from '@/lib/episodes'
import { siteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const episodes = await getEpisodes()
  const staticRoutes = [
    '',
    '/episodes',
    '/guests',
    '/about',
    '/guest-application',
    '/contact',
    '/privacy',
    '/terms',
  ]

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path || '/'}`,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...episodes.map((episode) => ({
      url: `${base}/episodes/${episode.slug}`,
      lastModified: episode.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
