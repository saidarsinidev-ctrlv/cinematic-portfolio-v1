/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        stage: {
          950: '#040406',
          900: '#08080a', // Primary dark stage cinematic aura
          850: '#0d0e12',
          800: '#12141c',
          700: '#1a1d28',
          600: '#252938',
        },
        cyber: {
          blue: '#00f0ff',
          neon: '#38bdf8',
          purple: '#a855f7',
          violet: '#818cf8',
          emerald: '#10b981',
          matrix: '#00ff88',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(56, 189, 248, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.45)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.35)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.35)',
        'badge-3d': '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 40px rgba(56, 189, 248, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'sheen': 'sheen 3s ease-in-out infinite',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
