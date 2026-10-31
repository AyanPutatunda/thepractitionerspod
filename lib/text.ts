export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function formatViews(count: number): string {
  return new Intl.NumberFormat('en-US').format(count)
}

export function firstParagraph(text: string): string {
  const block = text
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .find(Boolean)
  return block ?? ''
}

export function excerpt(text: string, max = 220): string {
  const clean = firstParagraph(text)
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const last = cut.lastIndexOf(' ')
  return `${(last > 80 ? cut.slice(0, last) : cut).trim()}…`
}

export type TextPart =
  { type: 'text'; value: string } | { type: 'link'; value: string; href: string }

const urlPattern = /https?:\/\/[^\s<>"']+/g

export function linkify(text: string): TextPart[] {
  const parts: TextPart[] = []
  let last = 0

  for (const match of text.matchAll(urlPattern)) {
    const start = match.index ?? 0
    const raw = match[0]
    if (start > last) parts.push({ type: 'text', value: text.slice(last, start) })

    const trimmed = raw.replace(/[),.;:!?]+$/g, '')
    const trailing = raw.slice(trimmed.length)
    if (trimmed) parts.push({ type: 'link', value: trimmed, href: trimmed })
    if (trailing) parts.push({ type: 'text', value: trailing })
    last = start + raw.length
  }

  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  return parts
}
