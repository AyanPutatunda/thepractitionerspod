import type { Metadata } from 'next'
import { GuestApplicationForm } from '@/components/GuestApplicationForm'
import { PencilMark } from '@/components/PencilMark'

export const metadata: Metadata = {
  title: 'Be a guest',
  description:
    'Apply to be a guest on The Practitioners Pod. Remote conversation, published on YouTube.',
  alternates: { canonical: '/guest-application' },
}

export default function GuestApplicationPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">Tell the story of something you shipped</h1>
          <PencilMark />
        </div>
        <p className="dek">
          A remote conversation about real implementation, published on YouTube. No vendor pitches.
        </p>
        <ul className="notes" style={{ gap: 12 }}>
          <li>
            <span className="notes-num">1</span>
            <p className="lede">Bring a system you have actually run.</p>
          </li>
          <li>
            <span className="notes-num">2</span>
            <p className="lede">We record remotely.</p>
          </li>
          <li>
            <span className="notes-num">3</span>
            <p className="lede">
              Say what should stay off the record before the episode is published.
            </p>
          </li>
        </ul>
      </header>
      <GuestApplicationForm />
    </div>
  )
}
