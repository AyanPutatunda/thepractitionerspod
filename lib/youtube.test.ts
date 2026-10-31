import { describe, expect, it } from 'vitest'
import {
  extractChannelId,
  feedChannelId,
  isoDurationToMinutes,
  parseDuration,
  parseYouTubeFeed,
  slugifyTitle,
  youtubeEmbedUrl,
} from './youtube'

describe('parseDuration', () => {
  it('formats an ISO 8601 duration that includes hours', () => {
    expect(parseDuration('PT1H2M3S')).toBe('01:02:03')
  })

  it('formats minutes and seconds without an hour part', () => {
    expect(parseDuration('PT5M9S')).toBe('05:09')
  })

  it('returns a zero duration when the input is not a duration', () => {
    expect(parseDuration('')).toBe('0:00')
    expect(parseDuration('not-a-duration')).toBe('0:00')
  })

  it('treats a bare PT marker as zero minutes and seconds', () => {
    expect(parseDuration('PT')).toBe('00:00')
  })
})

describe('isoDurationToMinutes', () => {
  it('rounds to the nearest minute', () => {
    expect(isoDurationToMinutes('PT1H2M30S')).toBe(63)
  })

  it('returns null when the duration is missing', () => {
    expect(isoDurationToMinutes('')).toBeNull()
    expect(isoDurationToMinutes('PT')).toBeNull()
  })
})

describe('parseYouTubeFeed', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
  <yt:channelId>UCe21K5ANdbqOXa8dHGi6Jzg</yt:channelId>
  <title>ThePractitionersPod</title>
  <entry>
    <yt:videoId>abcdefghijk</yt:videoId>
    <title>A real &amp; specific title</title>
    <published>2026-01-02T00:00:00+00:00</published>
    <media:group>
      <media:description>Line one.
Line two.</media:description>
      <media:thumbnail url="https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg"/>
    </media:group>
  </entry>
</feed>`

  it('reads public uploads and decodes entities', () => {
    const videos = parseYouTubeFeed(xml)
    expect(videos).toHaveLength(1)
    expect(videos[0]).toMatchObject({
      id: 'abcdefghijk',
      title: 'A real & specific title',
      description: 'Line one.\nLine two.',
      thumbnailUrl: 'https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg',
    })
  })

  it('returns an empty list when the channel has no entries', () => {
    expect(
      parseYouTubeFeed('<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"></feed>')
    ).toEqual([])
  })

  it('reads a channel id that dropped the UC prefix', () => {
    expect(feedChannelId(xml)).toBe('UCe21K5ANdbqOXa8dHGi6Jzg')
    expect(feedChannelId('<feed><yt:channelId>e21K5ANdbqOXa8dHGi6Jzg</yt:channelId></feed>')).toBe(
      'UCe21K5ANdbqOXa8dHGi6Jzg'
    )
  })
})

describe('extractChannelId', () => {
  it('reads the handle page browse id', () => {
    const html = '<script>"browseId":"UCe21K5ANdbqOXa8dHGi6Jzg"</script>'
    expect(extractChannelId(html)).toBe('UCe21K5ANdbqOXa8dHGi6Jzg')
  })
})

describe('slug and embed', () => {
  it('builds a stable slug from the title and video id', () => {
    expect(slugifyTitle('Evals & the new unit tests', 'abcdefghijk')).toBe(
      'evals-and-the-new-unit-tests-abcdefghijk'
    )
  })

  it('only embeds on youtube-nocookie', () => {
    expect(youtubeEmbedUrl('abcdefghijk')).toBe(
      'https://www.youtube-nocookie.com/embed/abcdefghijk'
    )
    expect(() => youtubeEmbedUrl('not valid')).toThrow()
  })
})
