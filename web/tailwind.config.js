import tailwindPrimeUi from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[class="app-dark"]'],
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindPrimeUi],
}
