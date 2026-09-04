import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "jxr-black": "#14161a",
        "jxr-blue": "#1c3fbf",
        "jxr-blue-bright": "#2547d6",
        "jxr-white": "#ffffff",
        "bg-warm": "#f7f4ee",
        "bg-panel": "#ffffff",
        charcoal: "#2b2e33",
        "charcoal-soft": "#565a61",
        hairline: "#dcd6c9",
      },
      fontFamily: {
        head: ['"Source Serif 4"', "Georgia", '"Times New Roman"', "serif"],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "2px",
      },
      transitionDuration: {
        // Named to avoid Tailwind's "ambiguous arbitrary value" warning
        // that arbitrary decimal-seconds values like duration-[0.25s]
        // trigger; these correspond to the site's real transition
        // timings (250ms/400ms) used across the header, nav, and cards.
        250: "250ms",
        400: "400ms",
      },
      maxWidth: {
        container: "1180px",
      },
      keyframes: {
        "hero-photo-resolve": {
          to: { opacity: "0.55", filter: "brightness(1)" },
        },
        "hero-fade-in": {
          to: { opacity: "1" },
        },
        "hero-logo-shrink": {
          to: {
            transform:
              "translate(var(--logo-tx), var(--logo-ty)) scale(var(--logo-scale))",
          },
        },
        "hero-draw": {
          to: { strokeDashoffset: "0" },
        },
        "hero-trace-fade-out": {
          to: { opacity: "0" },
        },
        "proof-bar-settle": {
          to: {
            backgroundColor: "#14161a",
            borderTopColor: "rgba(255,255,255,0.08)",
          },
        },
      },
      animation: {
        "hero-photo-resolve": "hero-photo-resolve 1s ease-out 1.75s forwards",
        "hero-fade-in": "hero-fade-in 1s ease-out 1.75s forwards",
        "hero-logo-shrink":
          "hero-logo-shrink 0.65s cubic-bezier(0.65,0,0.35,1) 0.55s forwards",
        "hero-draw-ring": "hero-draw 0.28s cubic-bezier(0.4,0,0.2,1) 0s forwards",
        "hero-draw-ring-blue":
          "hero-draw 0.28s cubic-bezier(0.4,0,0.2,1) 0.08s forwards",
        "hero-draw-xmark": "hero-draw 0.3s cubic-bezier(0.4,0,0.2,1) 0.22s forwards",
        "hero-draw-flag": "hero-draw 0.65s cubic-bezier(0.65,0,0.35,1) 1.1s forwards",
        "hero-trace-fade-out": "hero-trace-fade-out 0.8s ease-out 1.95s forwards",
        "proof-bar-settle": "proof-bar-settle 0.8s ease-out 2.75s forwards",
        "proof-bar-content-fade": "hero-fade-in 0.8s ease-out 2.75s forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
