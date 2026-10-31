import Link from 'next/link'
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
        <div>
          <Wordmark />
          <p>
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
          <a href={site.youtubeUrl}>YouTube</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </nav>
      </div>
    </footer>
  )
}
