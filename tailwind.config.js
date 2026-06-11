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
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        accentBlue: '#3b82f6',
        accentPurple: '#8b5cf6',
        accentCyan: '#06b6d4',
        accentPink: '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'gradient-glow': 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
      }
    },
  },
  plugins: [],
}
