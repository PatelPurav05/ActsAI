/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1E40AF",
        "custom-gray": "#F1F5F9",
      },
    },
  },
  plugins: [],
}