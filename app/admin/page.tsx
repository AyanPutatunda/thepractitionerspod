import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Users, FileText, Mail, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

async function getStats() {
  try {
    const [applications, guests, episodes, messages] = await Promise.all([
      prisma.guestApplication.count(),
      prisma.guest.count(),
      prisma.episode.count(),
      prisma.contactMessage.count({ where: { status: 'new' } }),
    ])

    return { applications, guests, episodes, messages }
  } catch (error) {
    return { applications: 0, guests: 0, episodes: 0, messages: 0 }
  }
}

async function getRecentApplications() {
  try {
    return await prisma.guestApplication.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    return []
  }
}

export default async function AdminDashboard() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const [stats, recentApplications] = await Promise.all([
    getStats(),
    getRecentApplications(),
  ])

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-20">
      <div className="container-custom">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-primary mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">
              Welcome back, {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-accent" />
              <span className="text-3xl font-bold text-primary">
                {stats.applications}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-text-secondary">
              Applications
            </h3>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-accent" />
              <span className="text-3xl font-bold text-primary">
                {stats.guests}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-text-secondary">
              Guests
            </h3>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-10 h-10 text-accent" />
              <span className="text-3xl font-bold text-primary">
                {stats.episodes}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-text-secondary">
              Episodes
            </h3>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-10 h-10 text-accent" />
              <span className="text-3xl font-bold text-primary">
                {stats.messages}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-text-secondary">
              New Messages
            </h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/applications"
                className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-sm transition-colors"
              >
                <div className="font-semibold text-primary">
                  Manage Applications
                </div>
                <p className="text-sm text-text-secondary">
                  Review and respond to guest applications
                </p>
              </Link>
              <Link
                href="/admin/episodes"
                className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-sm transition-colors"
              >
                <div className="font-semibold text-primary">
                  Manage Episodes
                </div>
                <p className="text-sm text-text-secondary">
                  Add or edit podcast episodes
                </p>
              </Link>
              <Link
                href="/admin/messages"
                className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-sm transition-colors"
              >
                <div className="font-semibold text-primary">
                  View Messages
                </div>
                <p className="text-sm text-text-secondary">
                  Check contact form submissions
                </p>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Recent Applications
            </h3>
            {recentApplications.length > 0 ? (
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <Link
                    key={app.id}
                    href={`/admin/applications/${app.id}`}
                    className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-sm transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-primary">
                        {app.name}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-sm ${
                          app.status === 'NEW'
                            ? 'bg-blue-100 text-blue-700'
                            : app.status === 'ACCEPTED'
                            ? 'bg-green-100 text-green-700'
                            : app.status === 'DECLINED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {app.currentRole} at {app.company}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">No recent applications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

