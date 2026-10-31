/**
 * Public facts only. Do not add a social handle, a guest, or a stat here
 * unless it has been verified outside this file.
 */
export const site = {
  name: 'The Practitioners Pod',
  wordmarkLead: 'Practitioners',
  wordmarkEm: 'Pod',
  description:
    'Real implementation stories from the people who ship. Conversations with practitioners, published on YouTube.',
  /** Verified 2026-10-31: the handle page title is "ThePractitionersPod - YouTube". */
  youtubeUrl: 'https://www.youtube.com/@thepractitionerspod',
  youtubeChannelId: 'UCe21K5ANdbqOXa8dHGi6Jzg',
  email: 'thepractitionerspod@gmail.com',
  hostName: 'Ayan Putatunda',
  hostUrl: 'https://ayanputatunda.com',
} as const

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://thepractitionerspod.com'
  return raw.replace(/\/$/, '')
}
