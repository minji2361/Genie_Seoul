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
        xs: "480px",
        xl: "1280px",
        "2xl": "1440px",
      },
      colors: {
        genie: {
          purple: "#7B4BFF",
          "purple-deep": "#5B2EE6",
          yellow: "#FFEE00",
          lavender: "#EDE7FF",
          black: "#111111",
        },
      },
      fontFamily: {
        sans:    ["var(--font-noto)", "'Noto Sans KR'", "sans-serif"],
        display: ["var(--font-black-han)", "'Black Han Sans'", "sans-serif"],
      },
      maxWidth: {
        genie: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
