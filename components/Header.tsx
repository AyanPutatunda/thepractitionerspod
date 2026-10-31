'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { Wordmark } from '@/components/Wordmark'

const links = [
  { href: '/episodes', label: 'Episodes' },
  { href: '/guests', label: 'Guests' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="shell">
      <nav className="nav" aria-label="Primary">
        <Link href="/" className="nav-brand">
          <Wordmark />
        </Link>
        <button
          type="button"
          className="btn btn-icon nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={22} weight="duotone" aria-hidden />
          ) : (
            <List size={22} weight="duotone" aria-hidden />
          )}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        <div id="nav-links" className={open ? 'nav-links is-open' : 'nav-links'}>
          {links.map((link) => {
            const current = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            className="btn btn-primary"
            href="/guest-application"
            onClick={() => setOpen(false)}
          >
            Be a guest
          </Link>
        </div>
      </nav>
    </header>
  )
}
