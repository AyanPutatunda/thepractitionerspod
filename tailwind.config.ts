import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        card: 'var(--color-card)',
        raised: 'var(--color-raised)',
        ink: 'var(--color-text)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          ink: 'var(--color-accent-ink)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'var(--font-inter)',
          'Segoe UI',
          'sans-serif',
        ],
      },
      spacing: {
        s1: 'var(--space-1)',
        s2: 'var(--space-2)',
        s3: 'var(--space-3)',
        s4: 'var(--space-4)',
        s5: 'var(--space-5)',
        s6: 'var(--space-6)',
        s8: 'var(--space-8)',
        s10: 'var(--space-10)',
        s12: 'var(--space-12)',
        s16: 'var(--space-16)',
        s20: 'var(--space-20)',
        s24: 'var(--space-24)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
      maxWidth: {
        sheet: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
