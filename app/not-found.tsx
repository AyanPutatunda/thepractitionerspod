import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      style={{
        padding: 'clamp(48px, 7vw, 96px) 0 112px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: '40ch',
      }}
    >
      <span className="kicker">404</span>
      <h1 className="display">This page is not here</h1>
      <p className="dek">The address doesn’t match a page on the site.</p>
      <p style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link className="btn btn-primary" href="/">
          Home
        </Link>
        <Link className="btn btn-secondary" href="/episodes">
          Episodes
        </Link>
      </p>
    </section>
  )
}
