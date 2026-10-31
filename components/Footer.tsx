import Link from 'next/link'
import { YoutubeLogo } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'
import { Wordmark } from '@/components/Wordmark'

const links = [
  { href: '/episodes', label: 'Episodes' },
  { href: '/guests', label: 'Guests' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export function Footer() {
  return (
    <footer className="shell">
      <div className="footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '38ch' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 20 }}>
            <Wordmark />
          </span>
          <p className="quiet" style={{ margin: 0, fontSize: 14, lineHeight: '22px' }}>
            Conversations with people building real data and AI systems. Hosted by{' '}
            <a href={site.hostUrl}>{site.hostName}</a>.
          </p>
        </div>
        <nav aria-label="Footer">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href={site.youtubeUrl}>
            <YoutubeLogo size={18} weight="duotone" aria-hidden /> YouTube
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </nav>
      </div>
    </footer>
  )
}
