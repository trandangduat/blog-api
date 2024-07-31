/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Inter Variable", ...defaultTheme.fontFamily.sans],
        'serif': ["Lora Variable", ...defaultTheme.fontFamily.serif]
      },
      typography: ({ theme }) => ({
         slate: {
          css: {
            '--tw-prose-invert-body': theme('colors.slate[400]'),
            '--tw-prose-invert-headings': theme('colors.slate[200]'),
            '--tw-prose-invert-lead': theme('colors.slate[400]'),
            '--tw-prose-invert-links': theme('colors.sky[400]'),
            '--tw-prose-invert-bold': theme('colors.slate[200]'),
            '--tw-prose-invert-counters': theme('colors.slate[400]'),
            '--tw-prose-invert-bullets': theme('colors.slate[600]'),
            '--tw-prose-invert-hr': theme('colors.slate[700]'),
            '--tw-prose-invert-quotes': theme('colors.slate[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.slate[700]'),
            '--tw-prose-invert-captions': theme('colors.slate[400]'),
            '--tw-prose-invert-code': theme('colors.slate[200]'),
            '--tw-prose-invert-pre-code': theme('colors.slate[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(30 41 59 / 50%)', // slate-800 with 50% opacity
            '--tw-prose-invert-th-borders': theme('colors.slate[600]'),
            '--tw-prose-invert-td-borders': theme('colors.slate[700]'),
          },
        },
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
}

