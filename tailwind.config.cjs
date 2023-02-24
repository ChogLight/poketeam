/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation:{
        appear: 'appear 1s ease-out'
      },
       keyframes: {
        appear : {
          '0%' : { display: 'none', opacity: 0},
          '1%' : { display: 'block', opacity: 0},
          '100%':{ display: 'block', opacity: 1}
        }
       }
    },
  },
  plugins: [],
}
