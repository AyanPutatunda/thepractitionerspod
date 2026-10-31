import Link from 'next/link'
import { PencilMark } from '@/components/PencilMark'

export default function NotFound() {
  return (
    <section className="page">
      <header className="page-intro">
        <p className="meta">404</p>
        <div className="title-block">
          <h1 className="display">This page is not here</h1>
          <PencilMark />
        </div>
        <p className="dek">The address doesn’t match a page on the site.</p>
        <div className="actions">
          <Link className="btn btn-primary" href="/">
            Home
          </Link>
          <Link className="btn btn-secondary" href="/episodes">
            Episodes
          </Link>
        </div>
      </header>
    </section>
  )
}
