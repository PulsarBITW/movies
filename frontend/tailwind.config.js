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
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
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
        success: {
          DEFAULT: 'var(--color-success)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
        },
        ring: {
          primary: 'var(--color-ring-primary)',
        },
        header: 'var(--color-header)',
        footer: 'var(--color-footer)',
      },
    },
  },
  plugins: [],
};
