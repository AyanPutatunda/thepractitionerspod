'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section
      style={{
        padding: 'clamp(48px, 7vw, 96px) 0 112px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: '46ch',
      }}
    >
      <span className="kicker">Error</span>
      <h1 className="display">This page didn’t load</h1>
      <p className="dek">
        Try it again. If it keeps failing, the rest of the site is still available.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => reset()}
        style={{ width: 'fit-content' }}
      >
        Try again
      </button>
    </section>
  )
}
