/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'header-color': 'var(--header-color)',
        'footer-text': 'var(--footer-text)',
        text: 'var(--text)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        error: 'var(--error)',
        success: 'var(--success)',
        'dark-500': 'var(--dark-500)',
        'shadow-1': 'var(--shadow-1)',
      },
    },
  },
  plugins: [],
};
