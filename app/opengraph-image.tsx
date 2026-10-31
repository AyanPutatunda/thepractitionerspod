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
        background: '#f3f5f7',
        color: '#1c1c1e',
        padding: '72px',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28, fontWeight: 600 }}>The Practitioners Pod</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            lineHeight: 1.05,
            letterSpacing: -1,
            maxWidth: 860,
            fontWeight: 600,
          }}
        >
          Real implementation stories from the people who ship
        </div>
        <div
          style={{ display: 'flex', width: 32, height: 2, background: '#006786', borderRadius: 2 }}
        />
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#006786' }}>thepractitionerspod.com</div>
    </div>,
    size
  )
}
