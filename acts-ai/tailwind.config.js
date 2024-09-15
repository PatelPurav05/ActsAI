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