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
        textMuted: 'var(--text-muted)',
        accentBlue: 'var(--accent-blue)',
        borderSilver: 'var(--border-silver)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, var(--accent-blue), var(--accent-highlight))',
      }
    },
  },
  plugins: [],
}
