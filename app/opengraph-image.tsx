import { ImageResponse } from 'next/og'

export const alt = 'The Practitioners Pod'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f7f4ee',
        color: '#1f1b16',
        padding: '72px',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28 }}>The Practitioners Pod</div>
      <div style={{ display: 'flex', fontSize: 64, lineHeight: 1.08, maxWidth: 860 }}>
        Real implementation stories from the people who ship
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#006786' }}>thepractitionerspod.com</div>
    </div>,
    size
  )
}
