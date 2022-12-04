/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      // adding the screens sizes for responsive for 
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      '2xl': '1536px'
    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}
