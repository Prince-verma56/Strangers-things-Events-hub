import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Stranger Things custom colors
        void: {
          DEFAULT: "hsl(var(--void))",
          deep: "hsl(var(--void-deep))",
        },
        crimson: {
          DEFAULT: "hsl(var(--crimson))",
          dark: "hsl(var(--crimson-dark))",
          glow: "hsl(var(--crimson-glow))",
        },
        electric: "hsl(var(--electric))",
        fog: "hsl(var(--fog))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        stranger: ['Bebas Neue', 'sans-serif'],
        horror: ['Special Elite', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        empire: ['Empire', 'sans-serif'],
        benguiat: ['Benguiat Bold', 'serif'],
        dragonforce: ['Dragonforce', 'sans-serif'],
        kraken: ['Kraken', 'sans-serif'],
        parryhotter: ['Parry Hotter', 'serif'],
        lastofus: ['The_Last_Of_Us', 'sans-serif'],
        'stranger-outline': ['Stranger Things Outlined', 'sans-serif'],
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
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-red": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(0 100% 50% / 0.4), 0 0 40px hsl(0 100% 50% / 0.2)"
          },
          "50%": {
            boxShadow: "0 0 40px hsl(0 100% 50% / 0.6), 0 0 80px hsl(0 100% 50% / 0.4), 0 0 120px hsl(0 100% 50% / 0.2)"
          },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "1" },
          "52%": { opacity: "0.8" },
          "54%": { opacity: "1" },
          "56%": { opacity: "0.9" },
          "58%": { opacity: "1" },
        },
        "glitch": {
          "0%, 90%, 100%": { transform: "translate(0)", filter: "none" },
          "91%": { transform: "translate(-2px, 1px)", filter: "hue-rotate(90deg)" },
          "92%": { transform: "translate(2px, -1px)", filter: "hue-rotate(-90deg)" },
          "93%": { transform: "translate(-1px, -1px)", filter: "none" },
          "94%": { transform: "translate(1px, 1px)", filter: "hue-rotate(45deg)" },
        },
        "lightning": {
          "0%": { opacity: "0" },
          "20%": { opacity: "1" },
          "40%": { opacity: "0.3" },
          "60%": { opacity: "0.8" },
          "100%": { opacity: "0" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-5px) rotate(-0.5deg)" },
          "20%": { transform: "translateX(5px) rotate(0.5deg)" },
          "30%": { transform: "translateX(-5px) rotate(-0.5deg)" },
          "40%": { transform: "translateX(5px) rotate(0.5deg)" },
          "50%": { transform: "translateX(-3px)" },
          "60%": { transform: "translateX(3px)" },
          "70%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
        },
        "letter-spacing": {
          "0%": { letterSpacing: "0.5em", opacity: "0" },
          "100%": { letterSpacing: "0.15em", opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-red": "pulse-red 2s ease-in-out infinite",
        "flicker": "flicker 3s infinite",
        "glitch": "glitch 2s infinite",
        "lightning": "lightning 0.2s ease-out",
        "shake": "shake 0.5s ease-in-out",
        "letter-spacing": "letter-spacing 1.5s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
