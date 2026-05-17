import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        desktop: "1440px",
      },
      colors: {
        genie: {
          purple: "#5D29D6",
          yellow: "#F2E205",
          lavender: "#E6E0F8",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "system-ui", "sans-serif"],
        paperlogyLight: ["var(--font-paperlogy)"],
        paperlogy: ["var(--font-paperlogy)"],
        paperlogyBold: ["var(--font-paperlogy)"],
        paperlogyBlack: ["var(--font-paperlogy)"],
        gmarket: ["var(--font-gmarket)"],
        appleThin: ["var(--font-apple-sd)"],
        appleMedium: ["var(--font-apple-sd)"],
        appleSemiBold: ["var(--font-apple-sd)"],
        appleHB: ["var(--font-apple-sd)"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
