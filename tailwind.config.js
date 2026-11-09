/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./hero-options/**/*.html",
    "./generate_hero_options.py",
  ],
  theme: {
    extend: {
      colors: {
        kachoras: {
          bronze: '#B3261E',
          bronzeHover: '#961F18',
          bronzeDark: '#801812',
          bronzeLight: '#961F18',
          gold: '#C59B27',
          goldHover: '#B0881F',
          goldLight: '#F7EFCF',
          ivory: '#FFFFFF',
          cream: '#F1F5F9',
          sand: '#E2E8F0',
          charcoal: '#111827',
          slate: '#1F2937',
          muted: '#6B7280',
          border: '#E2E8F0',
          borderDark: '#2D3748'
        }
      },
      fontFamily: {
        sans: ['"JUST Sans"', 'Manrope', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', '"JUST Sans"', 'sans-serif'],
        regal: ['Cinzel', 'Georgia', 'serif'],
        arabic: ['Arial', 'Tahoma', 'sans-serif']
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(179, 38, 30, 0.08), 0 4px 6px -2px rgba(179, 38, 30, 0.04)',
        'luxury-hover': '0 20px 40px -5px rgba(179, 38, 30, 0.16), 0 8px 10px -4px rgba(179, 38, 30, 0.08)',
        'gold-glow': '0 0 25px rgba(197, 155, 39, 0.25)'
      }
    },
  },
  plugins: [],
}
