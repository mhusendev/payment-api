/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,ejs}","./**/**/*.{html,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
