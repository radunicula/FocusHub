/** @type {import('tailwindcss').Config} */
// The accent color uses CSS variables (--accent-*) so it can be changed in Settings
const accentShade = (n) => `rgb(var(--accent-${n}) / <alpha-value>)`;

module.exports = {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          100: accentShade(100),
          200: accentShade(200),
          300: accentShade(300),
          400: accentShade(400),
          500: accentShade(500),
          600: accentShade(600),
          700: accentShade(700),
        },
      },
    },
  },
};
