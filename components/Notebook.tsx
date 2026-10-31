/**
 * The hero object when no episode is public yet: one open notebook left on the
 * desk after a conversation. One pen stroke carries the accent. No readable writing.
 */
export function Notebook() {
  const left = [112, 148, 184, 220, 256, 292]
  const right = [112, 148, 184, 220, 256, 292]
  return (
    <figure className="notebook">
      <svg viewBox="0 0 560 440" role="img" aria-label="An open notebook with a pencil">
        <ellipse cx="268" cy="400" rx="200" ry="16" fill="#1f1b16" opacity="0.07" />
        <rect
          x="40"
          y="28"
          width="440"
          height="344"
          rx="16"
          fill="#fdfbf7"
          stroke="#1f1b16"
          strokeOpacity="0.12"
        />
        <rect x="252" y="28" width="16" height="344" fill="#1f1b16" opacity="0.05" />
        <path d="M260 44v312" stroke="#1f1b16" strokeOpacity="0.22" strokeWidth="1.5" />
        {left.map((y) => (
          <path
            key={`l-${y}`}
            d={`M72 ${y}h156`}
            stroke="#1f1b16"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        ))}
        {right.map((y) => (
          <path
            key={`r-${y}`}
            d={`M292 ${y}h156`}
            stroke="#1f1b16"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        ))}
        <path d="M292 184h104" stroke="#006786" strokeWidth="1.75" strokeLinecap="round" />
        <g transform="translate(430 64) rotate(22)">
          <rect x="0" y="0" width="18" height="16" rx="3" fill="#efe9df" />
          <rect x="0" y="16" width="18" height="8" fill="#8a847a" />
          <rect x="0" y="24" width="18" height="168" rx="1" fill="#d7b48a" />
          <path d="M0 192h18l-9 30z" fill="#e7d7c3" />
          <path d="M4 206h10l-5 16z" fill="#1f1b16" />
        </g>
      </svg>
    </figure>
  )
}
