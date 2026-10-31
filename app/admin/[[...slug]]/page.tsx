import { notFound } from 'next/navigation'
import { isSupabaseConfigured } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!isSupabaseConfigured()) notFound()

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) notFound()
  } catch {
    notFound()
  }

  return (
    <section style={{ padding: 'clamp(48px, 7vw, 96px) 0 112px', maxWidth: '46ch' }}>
      <h1 className="display">Admin</h1>
      <p className="dek">You are signed in. Pipeline tools are not in this release.</p>
    </section>
  )
}
