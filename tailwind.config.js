/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './components/*.html', './app.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        cyber: {
          bg:     '#07070f',
          card:   '#0d0d1a',
          border: '#1a1a2e',
          cyan:   '#00e5ff',
          purple: '#a855f7',
          green:  '#10b981',
          muted:  '#475569',
          text:   '#e2e8f0',
        }
      }
    }
  },
  plugins: [],
}
