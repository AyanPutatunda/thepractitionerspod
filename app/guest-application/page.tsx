import type { Metadata } from 'next'
import { GuestApplicationForm } from '@/components/GuestApplicationForm'

export const metadata: Metadata = {
  title: 'Be a guest',
  description:
    'Apply to be a guest on The Practitioners Pod. Remote conversation, published on YouTube.',
  alternates: { canonical: '/guest-application' },
}

export default function GuestApplicationPage() {
  return (
    <section
      style={{
        padding: 'clamp(48px, 7vw, 96px) 0 112px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <span className="kicker">Be a guest</span>
      <h1 className="display">Tell the story of something you shipped</h1>
      <p className="dek">
        A remote conversation about real implementation, published on YouTube. No vendor pitches.
      </p>
      <ul
        className="lede"
        style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <li>Bring a system you have actually run.</li>
        <li>We record remotely.</li>
        <li>Say what should stay off the record before the episode is published.</li>
      </ul>
      <GuestApplicationForm />
    </section>
  )
}
