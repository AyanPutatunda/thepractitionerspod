import { NextResponse, type NextRequest } from 'next/server'
import { isPrivatePath, isSupabaseConfigured } from '@/lib/env'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  if (!isPrivatePath(request.nextUrl.pathname) || !isSupabaseConfigured()) {
    return NextResponse.next()
  }
  return updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
