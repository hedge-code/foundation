/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'text-and-margin': 'font-size, margin'
      }
    },
  },
  plugins: [],
}

