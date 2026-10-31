import type { Metadata } from 'next'
import { PencilMark } from '@/components/PencilMark'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for using the The Practitioners Pod website.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <article className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">Terms</h1>
          <PencilMark />
        </div>
        <p className="lede">
          {site.name} is a website for a YouTube show hosted by{' '}
          <a href={site.hostUrl}>{site.hostName}</a>. Episode video plays from YouTube and is
          covered by YouTube’s terms as well as these.
        </p>
      </header>
      <div className="prose">
        <h2>Using the site</h2>
        <p className="lede">
          You may read the pages and apply to be a guest or send a message. Don’t submit someone
          else’s personal information without a reason they would expect, and don’t use the forms to
          send spam or malware.
        </p>
        <h2>No warranty</h2>
        <p className="lede">
          The site is provided as-is. Conversations describe one practitioner’s experience. They are
          not professional advice. Episode pages appear when a video is public on the{' '}
          <a href={site.youtubeUrl}>YouTube channel</a>.
        </p>
        <h2>Contact</h2>
        <p className="lede">
          Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </article>
  )
}
