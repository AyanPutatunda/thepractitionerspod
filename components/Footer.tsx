import Link from 'next/link'
import { Youtube, Linkedin, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    podcast: [
      { label: 'Episodes', href: '/episodes' },
      { label: 'Guests', href: '/guests' },
      { label: 'About', href: '/about' },
    ],
    participate: [
      { label: 'Be a Guest', href: '/apply' },
      { label: 'Contact Us', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@thepractitionerspod', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/thepractitionerspod', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/practitionerspod', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@thepractitionerspod.com', label: 'Email' },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">The Practitioners Pod</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              Conversations with tech practitioners who build the future.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-sm bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Podcast Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Podcast</h4>
            <ul className="space-y-3">
              {footerLinks.podcast.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Participate</h4>
            <ul className="space-y-3">
              {footerLinks.participate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © {currentYear} The Practitioners Pod. All rights reserved.
            </p>
            <p className="text-neutral-400 text-sm mt-4 md:mt-0">
              Built with Next.js and hosted on Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

