import type { Metadata } from 'next'
import { PencilMark } from '@/components/PencilMark'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How The Practitioners Pod handles messages sent through this site.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <article className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">Privacy</h1>
          <PencilMark />
        </div>
        <p className="lede">
          This page describes what the site actually collects. {site.name} is hosted by{' '}
          <a href={site.hostUrl}>{site.hostName}</a>.
        </p>
      </header>
      <div className="prose">
        <h2>Forms</h2>
        <p className="lede">
          The contact form and the guest application are collected by Netlify Forms, the form
          service on the host that serves this site. Each submission includes the fields you fill
          in, and a consent checkbox you have to tick. There is a hidden honeypot field for spam
          filtering. Submissions are not sold.
        </p>
        <h2>Email</h2>
        <p className="lede">
          You can also write to <a href={`mailto:${site.email}`}>{site.email}</a>. To ask for a form
          submission to be deleted, email that address and say which message.
        </p>
        <h2>Video</h2>
        <p className="lede">
          Episode pages embed YouTube’s privacy-enhanced player (youtube-nocookie.com). YouTube
          receives the usual player request when the embed loads. This site does not run a
          newsletter and does not set advertising cookies of its own.
        </p>
        <h2>Admin</h2>
        <p className="lede">
          Guest records for the private pipeline are not part of this public release. When that
          database is connected, access is limited to signed-in roles. It is not on this site yet.
        </p>
      </div>
    </article>
  )
}
