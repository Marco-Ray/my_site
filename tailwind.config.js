// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '246': '61.5rem',
      }
    },
  },
  variants: {
    extend: {},
    cursor: ['hover'],
  },
  plugins: [],
};
