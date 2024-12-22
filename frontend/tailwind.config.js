/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'header-color': 'var(--header-color)',
        text: 'var(--text)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        error: 'var(--error)',
        success: 'var(--success)',
      },
    },
  },
  plugins: [],
};
