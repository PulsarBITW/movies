import tailwindcssAnimatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: 'var(--color-text-primary)',
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          footer: 'var(--color-text-footer)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          800: 'var(--color-success-800)',
          900: 'var(--color-success-900)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          light: 'var(--color-destructive-light)',
          50: 'var(--color-destructive-50)',
          100: 'var(--color-destructive-100)',
          200: 'var(--color-destructive-200)',
          300: 'var(--color-destructive-300)',
          400: 'var(--color-destructive-400)',
          500: 'var(--color-destructive-500)',
          600: 'var(--color-destructive-600)',
          700: 'var(--color-destructive-700)',
          800: 'var(--color-destructive-800)',
          900: 'var(--color-destructive-900)',
        },
        purple: {
          50: 'var(--color-purple-50)',
          100: 'var(--color-purple-100)',
          200: 'var(--color-purple-200)',
          300: 'var(--color-purple-300)',
          400: 'var(--color-purple-400)',
          500: 'var(--color-purple-500)',
          600: 'var(--color-purple-600)',
          700: 'var(--color-purple-700)',
          800: 'var(--color-purple-800)',
          900: 'var(--color-purple-900)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          primary: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
          success: 'var(--color-background-success)',
          destructive: 'var(--color-background-destructive)',
        },
        foreground: {
          DEFAULT: 'var(--color-foreground)',
          primary: 'var(--color-foreground)',
          secondary: 'var(--color-foreground-secondary)',
          success: 'var(--color-foreground-success)',
          destructive: 'var(--color-foreground-destructive)',
        },
        'navigation-menu': {
          bg: 'var(--color-navigation-menu-bg)',
        },
        btn: {
          text: {
            DEFAULT: 'var(--color-btn-text)',
            outline: 'var(--color-btn-text-outline)',
          },
          hovered: {
            bg: {
              primary: 'var(--btn-hovered-bg-primary)',
              secondary: 'var(--btn-hovered-bg-secondary)',
              success: 'var(--btn-hovered-bg-success)',
              destructive: 'var(--btn-hovered-bg-destructive)',
            },
          },
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        ring: {
          primary: 'var(--color-ring-primary)',
        },
        header: 'var(--color-header)',
        footer: 'var(--color-footer)',
      },
    },
  },
  plugins: [tailwindcssAnimatePlugin],
};
