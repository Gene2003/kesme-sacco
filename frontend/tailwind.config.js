/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#2E7D32',
          dark:    '#1B5E20',
          light:   '#43A047',
          pale:    '#E8F5E9',
        },
        gold: {
          DEFAULT: '#F9A825',
          dark:    '#F57F17',
          pale:    '#FFFDE7',
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
