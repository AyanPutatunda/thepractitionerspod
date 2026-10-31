export function Misregister({ text }: { text: string }) {
  return (
    <span className="cmyk-head">
      <span className="plate plate-c" aria-hidden="true">
        {text}
      </span>
      <span className="plate plate-m" aria-hidden="true">
        {text}
      </span>
      <span className="paper">{text}</span>
    </span>
  )
}
