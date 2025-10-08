import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'The Practitioners Pod | Conversations with Tech Leaders',
  description: 'Professional podcast featuring tech industry leaders and practitioners. Deep conversations about building the future of technology.',
  keywords: ['podcast', 'tech', 'technology', 'practitioners', 'leadership', 'interviews'],
  authors: [{ name: 'The Practitioners Pod' }],
  openGraph: {
    title: 'The Practitioners Pod',
    description: 'Conversations with Tech Practitioners Who Build the Future',
    url: 'https://thepractitionerspod.com',
    siteName: 'The Practitioners Pod',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Practitioners Pod',
    description: 'Conversations with Tech Practitioners Who Build the Future',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a2332',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}

