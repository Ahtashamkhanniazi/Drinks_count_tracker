/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to look for classes in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E3A8A', // Example of adding a custom color (optional)
      },
    },
  },
  plugins: [],
}
