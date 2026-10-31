import { readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = resolve(dir, name)
    if (statSync(path).isDirectory()) return files(path)
    return /\.(tsx|ts|css|html)$/.test(name) ? [path] : []
  })
}

const sources = [
  ...files(resolve(process.cwd(), 'app')),
  ...files(resolve(process.cwd(), 'components')),
  resolve(process.cwd(), 'app/globals.css'),
]

const banned = [
  'open.spotify.com',
  'podcasts.apple.com',
  'hello@thepractitionerspod.com',
  'host@thepractitionerspod.com',
  'linkedin.com',
  'twitter.com',
  'x.com/',
  '#edbb00',
  'process-yellow',
  'Staff Data Engineer',
  'Priya Raman',
  'audio-only',
  '/feed.xml',
  'rss.xml',
]

describe('public copy', () => {
  it('does not ship placeholder guests, stats, or extra platforms', () => {
    const hits = sources.flatMap((path) => {
      const text = readFileSync(path, 'utf8')
      return banned.filter((needle) => text.includes(needle)).map((needle) => `${path}: ${needle}`)
    })
    expect(hits).toEqual([])
  })
})
