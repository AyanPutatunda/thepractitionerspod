'use client'

import { Share2 } from 'lucide-react'

interface ShareEpisodeButtonProps {
  title: string
  description: string
}

export default function ShareEpisodeButton({ title, description }: ShareEpisodeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title,
            text: description,
            url: window.location.href,
          }).catch(() => {
            // The share sheet was dismissed.
          })
        } else {
          navigator.clipboard.writeText(window.location.href)
          alert('Link copied to clipboard!')
        }
      }}
      className="btn-secondary"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share Episode
    </button>
  )
}
