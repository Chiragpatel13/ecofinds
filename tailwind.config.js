/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        crimson: ['Crimson Text', 'serif'],
      },
      colors: {
        border: 'var(--color-border)', /* light gray */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* deep forest green */
        background: 'var(--color-background)', /* white */
        foreground: 'var(--color-foreground)', /* near black */
        surface: {
          DEFAULT: 'var(--color-surface)', /* warm cream */
          foreground: 'var(--color-surface-foreground)', /* near black */
        },
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep forest green */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* sage green */
          foreground: 'var(--color-secondary-foreground)', /* near black */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* muted red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* warm cream */
          foreground: 'var(--color-muted-foreground)', /* medium gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* terracotta orange */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)', /* near black */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)', /* near black */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* forest green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* warm orange */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* muted red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        'text-primary': 'var(--color-text-primary)', /* near black */
        'text-secondary': 'var(--color-text-secondary)', /* medium gray */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        organic: "50px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "bloom": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "50%": { transform: "scale(1.1)", opacity: "0.9" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "particle-float": {
          "0%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "translateY(-10px) rotate(180deg)", opacity: "1" },
          "100%": { transform: "translateY(0px) rotate(360deg)", opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in": "slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "bloom": "bloom 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "particle-float": "particle-float 3s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'organic': '0 4px 20px rgba(45, 90, 39, 0.08)',
        'organic-lg': '0 8px 24px rgba(45, 90, 39, 0.12)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}