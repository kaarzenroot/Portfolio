/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#131211',
          surface: '#1c1a18',
          elevated: '#242220',
          line: '#2e2b28',
        },
        bone: {
          DEFAULT: '#f0ece4',
          muted: '#a09890',
          faint: '#625d58',
        },
        crimson: {
          DEFAULT: '#b03030',
          soft: '#c0392b',
          glow: 'rgba(176,48,48,0.35)',
        },
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        hero: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        widestx: '0.3em',
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'draw-line': 'drawLine 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up': 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%,100%': { opacity: '0.2' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        drawLine: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left' },
          to: { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px) scale(0.96)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(176,48,48,0.15)' },
          '50%': { boxShadow: '0 0 50px rgba(176,48,48,0.35)' },
        },
        scrollBounce: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
};
