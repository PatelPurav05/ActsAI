/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          muted: 'var(--muted)',
          'muted-foreground': 'var(--muted-foreground)',
          primary: 'var(--primary)',
          'primary-foreground': 'var(--primary-foreground)',
        },
      },
    },
    plugins: [],
  }
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
