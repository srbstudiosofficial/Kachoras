/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kachoras: {
          bronze: '#7A2E16',
          bronzeHover: '#652310',
          bronzeDark: '#4D1A0B',
          bronzeLight: '#943B20',
          gold: '#C59B27',
          goldHover: '#B0881F',
          goldLight: '#F7EFCF',
          ivory: '#FBF9F5',
          cream: '#F4EFE6',
          sand: '#EADBCA',
          charcoal: '#111827',
          slate: '#1F2937',
          muted: '#6B7280',
          border: '#E5DED3',
          borderDark: '#2D3748'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        regal: ['Cinzel', 'Georgia', 'serif'],
        arabic: ['Arial', 'Tahoma', 'sans-serif']
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(122, 46, 22, 0.08), 0 4px 6px -2px rgba(122, 46, 22, 0.04)',
        'luxury-hover': '0 20px 40px -5px rgba(122, 46, 22, 0.16), 0 8px 10px -4px rgba(122, 46, 22, 0.08)',
        'gold-glow': '0 0 25px rgba(197, 155, 39, 0.25)'
      }
    },
  },
  plugins: [],
}
