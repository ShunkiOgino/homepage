/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080c10',
        surface: '#0f1923',
        elevated: '#162030',
        border: '#1a2d3d',
        cyan: '#00d4ff',
        blue: '#0070f3',
        primary: '#e8edf2',
        secondary: '#6b8096',
        muted: '#3d5266',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
