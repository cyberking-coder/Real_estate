import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#16181a',
          900: '#0e0f10',
          800: '#16181a',
          700: '#1f2225',
          600: '#2a2e32',
        },
        cream: {
          DEFAULT: '#f5f1ea',
          dim: '#e7e1d6',
          muted: '#b9b2a6',
        },
        gold: {
          DEFAULT: '#c9a876',
          light: '#dcc299',
          dark: '#a8884f',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.75rem', { lineHeight: '1' }],
        '8xl': ['6.5rem', { lineHeight: '0.95' }],
        '9xl': ['8.5rem', { lineHeight: '0.92' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxe-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      spacing: {
        section: 'clamp(5rem, 12vw, 11rem)',
      },
    },
  },
  plugins: [],
};

export default config;
