import { linkify } from '@/lib/text'

export function Prose({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="prose-blocks">
      {lines.map((line, index) =>
        line.trim() ? (
          <p key={index}>
            {linkify(line).map((part, partIndex) =>
              part.type === 'link' ? (
                <a key={partIndex} href={part.href} rel="noopener noreferrer">
                  {part.value}
                </a>
              ) : (
                <span key={partIndex}>{part.value}</span>
              )
            )}
          </p>
        ) : (
          <div key={index} style={{ height: 8 }} />
        )
      )}
    </div>
  )
}
