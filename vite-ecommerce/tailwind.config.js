/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tim': "url('/vite-ecommerce/src/assets/tim.jpg')"
      }
    },
  },
  plugins: [],
}

