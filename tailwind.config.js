/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#5cd4ff',
          DEFAULT: '#0abeff', // primary blue color
          dark: '#0083b8',
        },
        green: {
          light: '#54ebdb',
          DEFAULT: '#08d9c4', // secondary green color
          dark: '#06a08f',
        },
        pink: {
          light: '#ffcaf4',
          DEFAULT: '#fea3ec', // secondary Pink color
          dark: '#c879b7',
        }
      },
    },
  },
  plugins: [],
}
