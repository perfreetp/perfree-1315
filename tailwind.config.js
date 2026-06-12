/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ink: {
          50: '#f5f6f8',
          100: '#e6e8ec',
          200: '#c9cdd6',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#3a4055',
          600: '#2d3348',
          700: '#242938',
          800: '#1a1f2e',
          900: '#0f1219',
          950: '#080a0f',
        },
        paper: {
          50: '#faf5ec',
          100: '#f3e8d5',
          200: '#e8d5b7',
          300: '#dcc69e',
          400: '#d4b896',
          500: '#c7a67d',
          600: '#b89a72',
          700: '#9c825f',
          800: '#7d684d',
          900: '#5f4f3a',
          dark: '#8b7355',
        },
        fog: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#c5cdd8',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#4b5563',
          800: '#374151',
        },
        crimson: {
          100: '#fde8e6',
          200: '#fbd4d0',
          300: '#f5a8a0',
          400: '#e74c3c',
          500: '#c0392b',
          600: '#a93226',
          700: '#922b21',
          800: '#7b241c',
          light: '#e74c3c',
          dark: '#962d22',
        },
        gold: {
          100: '#fbf4e0',
          200: '#f5e8bf',
          300: '#edc94a',
          400: '#ddc06a',
          500: '#c9a84c',
          600: '#b8953f',
          700: '#a88a3a',
        },
        harbor: {
          100: '#eaf3f7',
          200: '#cfe5ed',
          300: '#9fc8d8',
          400: '#7bb3cc',
          500: '#5b8fa8',
          600: '#4a7389',
          700: '#3d5f73',
        },
        cork: {
          DEFAULT: '#8b6f47',
        },
      },
      fontFamily: {
        display: ['"ZCOOL XiaoWei"', 'serif'],
        body: ['"Noto Serif SC"', 'serif'],
      },
      animation: {
        'fog-drift': 'fog-drift 20s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pin-wobble': 'pin-wobble 0.3s ease-in-out',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fog-drift': {
          '0%': { opacity: '0.4', transform: 'translateX(-2%)' },
          '100%': { opacity: '0.6', transform: 'translateX(2%)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(192, 57, 43, 0.4)' },
          '50%': { boxShadow: '0 0 12px rgba(192, 57, 43, 0.7)' },
        },
        'pin-wobble': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
      },
    },
  },
  plugins: [],
};
