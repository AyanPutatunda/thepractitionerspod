import { youtubeEmbedUrl } from '@/lib/youtube'

export function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <figure>
      <div className="video-frame glass">
        <iframe
          src={youtubeEmbedUrl(videoId)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="video-note">
        The player loads from the privacy-enhanced youtube-nocookie domain.
      </figcaption>
    </figure>
  )
}
