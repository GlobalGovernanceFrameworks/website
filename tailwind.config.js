/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Colors based on your logo
        cosmic: {
          dark: '#2B4B8C',
          light: '#6B5CA5'
        },
        earthy: {
          dark: '#2D5F2D',
          light: '#7D9F7D' 
        },
        gold: {
          dark: '#B8860B',
          light: '#DAA520'
        },
        root: {
          dark: '#654321',
          light: '#8B7355'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
};
