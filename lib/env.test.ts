import { describe, expect, it } from 'vitest'
import { isPrivatePath, isSupabaseConfigured } from './env'

describe('isSupabaseConfigured', () => {
  it('is false when the public env is missing', () => {
    expect(isSupabaseConfigured({})).toBe(false)
    expect(
      isSupabaseConfigured({
        NEXT_PUBLIC_SUPABASE_URL: 'https://placeholder.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'placeholder-anon-key',
      })
    ).toBe(false)
  })

  it('is true for a real project url and key', () => {
    expect(
      isSupabaseConfigured({
        NEXT_PUBLIC_SUPABASE_URL: 'https://abcd.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      })
    ).toBe(true)
  })
})

describe('isPrivatePath', () => {
  it('hides admin and auth', () => {
    expect(isPrivatePath('/admin')).toBe(true)
    expect(isPrivatePath('/admin/login')).toBe(true)
    expect(isPrivatePath('/auth/callback')).toBe(true)
    expect(isPrivatePath('/')).toBe(false)
    expect(isPrivatePath('/episodes')).toBe(false)
  })
})
