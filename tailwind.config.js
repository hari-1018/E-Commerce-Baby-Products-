/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'custom-height': '500px',
      },

      width: {
        'custom-width': '748px',
        'custom-full': '1496px'
      }

    },
  },
  plugins: [],
}

