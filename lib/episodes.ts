import { cache } from 'react'
import { site } from '@/lib/site'
import {
  extractChannelId,
  isoDurationToMinutes,
  parseYouTubeFeed,
  slugifyTitle,
  type YouTubeVideo,
} from '@/lib/youtube'

export interface Episode {
  youtubeId: string
  slug: string
  number: number
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  durationMinutes: number | null
  viewCount: number | null
}

async function fetchText(url: string, label: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ThePractitionersPod/1.0 (+https://thepractitionerspod.com)',
        Accept: 'text/html,application/xml,text/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en',
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    })
    if (!response.ok) return null
    return await response.text()
  } catch {
    console.error(`YouTube ${label} request failed`)
    return null
  }
}

async function resolveChannelId(): Promise<string | null> {
  const fromEnv = process.env.YOUTUBE_CHANNEL_ID?.trim()
  if (fromEnv && /^UC[\w-]{22}$/.test(fromEnv)) return fromEnv

  const html = await fetchText(site.youtubeUrl, 'channel')
  const parsed = html ? extractChannelId(html) : null
  if (parsed) return parsed

  // Handle page was verified on 2026-10-31. Use that id only when the live
  // page cannot be parsed, then confirm it against the public uploads feed.
  return site.youtubeChannelId
}

async function enrich(
  videos: YouTubeVideo[]
): Promise<Map<string, { minutes: number | null; views: number | null }>> {
  const details = new Map<string, { minutes: number | null; views: number | null }>()
  const key = process.env.YOUTUBE_API_KEY?.trim()
  if (!key || videos.length === 0) return details

  const ids = videos
    .slice(0, 50)
    .map((video) => video.id)
    .join(',')
  const url = new URL('https://www.googleapis.com/youtube/v3/videos')
  url.searchParams.set('part', 'contentDetails,statistics')
  url.searchParams.set('id', ids)
  url.searchParams.set('key', key)

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    })
    if (!response.ok) return details
    const data = (await response.json()) as {
      items?: Array<{
        id?: string
        contentDetails?: { duration?: string }
        statistics?: { viewCount?: string }
      }>
    }
    for (const item of data.items ?? []) {
      if (!item.id) continue
      const views = Number(item.statistics?.viewCount)
      details.set(item.id, {
        minutes: item.contentDetails?.duration
          ? isoDurationToMinutes(item.contentDetails.duration)
          : null,
        views: Number.isFinite(views) ? views : null,
      })
    }
  } catch {
    console.error('YouTube Data API request failed')
  }

  return details
}

function toEpisodes(
  videos: YouTubeVideo[],
  extra: Map<string, { minutes: number | null; views: number | null }>
): Episode[] {
  const chronological = [...videos].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
  const episodes = chronological.map((video, index) => {
    const more = extra.get(video.id)
    return {
      youtubeId: video.id,
      slug: slugifyTitle(video.title, video.id),
      number: index + 1,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      publishedAt: video.publishedAt,
      durationMinutes: more?.minutes ?? null,
      viewCount: more?.views ?? null,
    }
  })
  return episodes.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export const getEpisodes = cache(async (): Promise<Episode[]> => {
  try {
    const channelId = await resolveChannelId()
    if (!channelId) return []
    const xml = await fetchText(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      'feed'
    )
    if (!xml) return []
    const videos = parseYouTubeFeed(xml)
    const extra = await enrich(videos)
    return toEpisodes(videos, extra)
  } catch {
    console.error('Episode sync failed')
    return []
  }
})

export async function getEpisode(slug: string): Promise<Episode | null> {
  const episodes = await getEpisodes()
  return episodes.find((episode) => episode.slug === slug) ?? null
}

export function episodeNeighbors(
  episodes: Episode[],
  slug: string
): {
  previous: Episode | null
  next: Episode | null
} {
  const index = episodes.findIndex((episode) => episode.slug === slug)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: episodes[index + 1] ?? null,
    next: episodes[index - 1] ?? null,
  }
}
