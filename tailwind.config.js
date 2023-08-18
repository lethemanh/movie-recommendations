/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/Icons/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#141414',
        headerBackground: '#080808',
        customGray: '#656565',
        '404-yellow': '#f8fb04',
        '404-teal': '#05ffff',
        '404-green': '#01ff02',
        '404-pink': '#fd00fb',
        '404-red': '#fb0202',
        '404-blue': '#0200fd',
      },
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      red: '#e50914',
      'dark-red': '#be030c',
    }),
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
