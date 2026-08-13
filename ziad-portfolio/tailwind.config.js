export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#11131A",
        obsidian: "#050507",
        neon: {
          blue: "#3B82F6",
          cyan: "#22D3EE",
        },
      },
      boxShadow: {
        glow: "0 30px 80px rgba(59, 130, 246, 0.18)",
        soft: "0 24px 80px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at top left, rgba(34,211,238,0.14), transparent 22%), radial-gradient(circle at 20% 20%, rgba(59,130,246,0.14), transparent 22%), radial-gradient(circle at 75% 15%, rgba(14,165,233,0.12), transparent 24%), radial-gradient(circle at bottom right, rgba(34,211,238,0.12), transparent 24%)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.08)" },
          "50%": { boxShadow: "0 0 70px rgba(59, 130, 246, 0.18)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out both",
        "fade-in-right": "fadeInRight 0.8s ease-out both",
        "fade-in-left": "fadeInLeft 0.8s ease-out both",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
