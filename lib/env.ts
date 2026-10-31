export function isSupabaseConfigured(
  env: Record<string, string | undefined> = process.env
): boolean {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) return false
  if (/placeholder|example|your-/i.test(url) || /placeholder|example|your-/i.test(key)) {
    return false
  }
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co')
  } catch {
    return false
  }
}

export function isPrivatePath(pathname: string): boolean {
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/auth' ||
    pathname.startsWith('/auth/')
  )
}
