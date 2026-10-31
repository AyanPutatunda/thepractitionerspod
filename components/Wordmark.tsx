import { site } from '@/lib/site'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      {site.wordmarkLead} {site.wordmarkEm}
    </span>
  )
}
