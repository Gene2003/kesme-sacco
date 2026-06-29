/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // New brand colors
        primary: {
          orange:  '#F7931E',
          green:   '#1FA34A',
          black:   '#111111',
          dark:    '#333333',
          light:   '#9E9E9E',
          pale:    '#F5F5F5',
        },
        // Legacy colors mapped to new brand
        green: {
          DEFAULT: '#1FA34A',
          dark:    '#111111',
          light:   '#1FA34A',
          pale:    '#F5F5F5',
        },
        gold: {
          DEFAULT: '#F7931E',
          dark:    '#F7931E',
          pale:    '#F5F5F5',
        },
      },
      fontFamily: {
        poppins:   ['Poppins', 'sans-serif'],
        opensans:  ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
