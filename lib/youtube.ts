export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
}

const CHANNEL_ID_PATTERN = /UC[\w-]{22}/

export function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match || !isoDuration.startsWith('PT')) return '0:00'

  const hours = match[1] || ''
  const minutes = match[2] || ''
  const seconds = match[3] || ''
  const parts: string[] = []

  if (hours) parts.push(hours.padStart(2, '0'))
  parts.push((minutes || '0').padStart(2, '0'))
  parts.push((seconds || '0').padStart(2, '0'))

  return parts.join(':')
}

export function isoDurationToMinutes(isoDuration: string): number | null {
  const match = isoDuration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
  if (!match) return null
  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)
  if (!hours && !minutes && !seconds) return null
  return Math.max(1, Math.round((hours * 3600 + minutes * 60 + seconds) / 60))
}

export function extractChannelId(html: string): string | null {
  const labeled =
    html.match(/"browseId":"(UC[\w-]{22})"/) ||
    html.match(/"externalId":"(UC[\w-]{22})"/) ||
    html.match(/youtube\.com\/channel\/(UC[\w-]{22})/)
  return labeled?.[1] ?? null
}

export function slugifyTitle(title: string, videoId: string): string {
  const base = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)
    .replace(/-+$/g, '')
  const id = videoId.toLowerCase()
  return base ? `${base}-${id}` : id
}

export function youtubeEmbedUrl(videoId: string): string {
  if (!/^[\w-]{11}$/.test(videoId)) {
    throw new Error('Invalid YouTube video id')
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}`
}

export function youtubeWatchUrl(videoId: string): string {
  if (!/^[\w-]{11}$/.test(videoId)) {
    throw new Error('Invalid YouTube video id')
  }
  return `https://www.youtube.com/watch?v=${videoId}`
}

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .trim()
}

function tagText(entry: string, tag: string): string {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`)
  const match = entry.match(pattern)
  return match ? decodeXml(match[1]) : ''
}

export function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  if (!xml.includes('<feed')) return []
  const entries = xml.split(/<entry\b[^>]*>/).slice(1)
  const videos: YouTubeVideo[] = []

  for (const entry of entries) {
    const id = tagText(entry, 'yt:videoId')
    const title = tagText(entry, 'title')
    if (!/^[\w-]{11}$/.test(id) || !title) continue
    const publishedAt = tagText(entry, 'published')
    const description = tagText(entry, 'media:description')
    const thumb = entry.match(/<media:thumbnail\b[^>]*\burl="([^"]+)"/)?.[1]
    videos.push({
      id,
      title,
      description,
      thumbnailUrl: thumb || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt,
    })
  }

  return videos
}

export function feedChannelId(xml: string): string | null {
  const match = xml.match(/<yt:channelId>([^<]+)<\/yt:channelId>/)
  if (!match) return null
  const raw = match[1].trim()
  if (CHANNEL_ID_PATTERN.test(raw)) return raw.match(CHANNEL_ID_PATTERN)?.[0] ?? null
  if (/^[\w-]{22}$/.test(raw)) return `UC${raw}`
  return null
}
