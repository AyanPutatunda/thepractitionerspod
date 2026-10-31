import { notFound } from 'next/navigation'
import { PencilMark } from '@/components/PencilMark'
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
    <section className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">Admin</h1>
          <PencilMark />
        </div>
        <p className="dek">You are signed in. Pipeline tools are not in this release.</p>
      </header>
    </section>
  )
}
