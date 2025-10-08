'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out successfully')
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="btn-secondary text-sm py-2 px-4"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </button>
  )
}

