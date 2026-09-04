/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          dark: '#1C1A14',
          DEFAULT: '#26231B',
          light: '#3A362B',
        },
        field: {
          green: '#2D5A1B',
          dark: '#1E3E12',
          light: '#3C7725',
        },
        growth: {
          DEFAULT: '#5C9E31',
          light: '#72BC3E',
          dark: '#457724',
        },
        warning: {
          amber: '#C8820A',
          light: '#E59B1E',
          dark: '#9E6607',
        },
        danger: {
          red: '#B03A2E',
          light: '#CF4B3D',
          dark: '#872C23',
        },
        sky: {
          blue: '#3B7FC4',
          light: '#5B9BE0',
          dark: '#2A5D91',
        },
        harvest: {
          gold: '#D4A017',
          light: '#E8B62F',
          dark: '#A67C0E',
        },
        parchment: {
          DEFAULT: '#F5F0E8',
          dark: '#E8DFD0',
          light: '#FAF7F2',
        },
        mist: {
          DEFAULT: '#EAF0E6',
          dark: '#D5E2CF',
          light: '#F4F7F2',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'scan-line': 'scan 4s linear infinite',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%', opacity: '0.8' },
          '50%': { top: '100%', opacity: '1' },
          '100%': { top: '0%', opacity: '0.8' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
