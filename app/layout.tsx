import type { Metadata } from 'next'
import { Instrument_Sans, Newsreader } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { site, siteUrl } from '@/lib/site'
import './globals.css'

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-instrument',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} · Real implementation stories`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.hostName, url: site.hostUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const revalidate = 3600

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const url = siteUrl()
  return (
    <html lang="en" className={`${instrument.variable} ${newsreader.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="shell" style={{ outline: 'none' }}>
          {children}
        </main>
        <Footer />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url,
            description: site.description,
            publisher: {
              '@type': 'Person',
              name: site.hostName,
              url: site.hostUrl,
            },
          }}
        />
      </body>
    </html>
  )
}
