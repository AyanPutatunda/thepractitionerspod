'use client'

import { PencilMark } from '@/components/PencilMark'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="page">
      <header className="page-intro">
        <div className="title-block">
          <h1 className="display">This page didn’t load</h1>
          <PencilMark />
        </div>
        <p className="dek">
          Try it again. If it keeps failing, the rest of the site is still available.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </header>
    </section>
  )
}
