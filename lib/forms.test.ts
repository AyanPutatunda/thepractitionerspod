import { describe, expect, it } from 'vitest'
import { contactSchema, guestApplicationSchema } from './forms'

const application = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  title: 'Engineer',
  company: 'Example',
  linkedin: '',
  bio: 'I work on data systems and have for several years.',
  topics: 'Warehouse migrations and contracts.',
  story:
    'We moved a warehouse without a freeze. Reconciliation, not the cutover, was the hard part of the project.',
  availability: 'Pacific, weekday mornings',
  'heard-from': '',
  consent: 'yes' as const,
}

describe('guest application', () => {
  it('accepts a complete application', () => {
    expect(guestApplicationSchema.safeParse(application).success).toBe(true)
  })

  it('rejects a missing consent flag and a short story', () => {
    expect(guestApplicationSchema.safeParse({ ...application, consent: '' }).success).toBe(false)
    expect(guestApplicationSchema.safeParse({ ...application, story: 'too short' }).success).toBe(
      false
    )
  })
})

describe('contact form', () => {
  it('accepts the public subjects', () => {
    expect(
      contactSchema.safeParse({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subject: 'Press',
        message: 'A question about the show.',
        consent: 'yes',
      }).success
    ).toBe(true)
  })
})
