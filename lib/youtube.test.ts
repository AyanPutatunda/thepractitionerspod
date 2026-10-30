import { describe, expect, it } from 'vitest'
import { parseDuration } from './youtube'

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
