import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2332',
          dark: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#4a5f7f',
          teal: '#5a8a9a',
          gold: '#b8956a',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        text: {
          primary: '#1a202c',
          secondary: '#4a5568',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        'content': '1200px',
      },
      letterSpacing: {
        'heading': '0.02em',
      },
      lineHeight: {
        'relaxed-plus': '1.7',
        'loose-plus': '1.8',
      },
      transitionDuration: {
        '350': '350ms',
      }
    },
  },
  plugins: [],
}
export default config

