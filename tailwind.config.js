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
          900: '#0f1219',
          800: '#1a1f2e',
          700: '#242938',
          600: '#2d3348',
          500: '#3a4055',
        },
        paper: {
          DEFAULT: '#d4b896',
          light: '#e8d5b7',
          dark: '#b89a72',
        },
        fog: {
          DEFAULT: '#9ca3af',
          dim: '#6b7280',
          light: '#c5cdd8',
        },
        crimson: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
          dark: '#962d22',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#ddc06a',
          dark: '#a88a3a',
        },
        harbor: {
          DEFAULT: '#5b8fa8',
          light: '#7bb3cc',
          dark: '#4a7389',
        },
        cork: '#8b6f47',
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
    },
  },
  plugins: [],
};
