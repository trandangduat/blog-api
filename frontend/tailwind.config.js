/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Inter Variable", ...defaultTheme.fontFamily.sans],
        'serif': ["Lora Variable", ...defaultTheme.fontFamily.serif]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
}

