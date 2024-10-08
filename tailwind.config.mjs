/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      "dark-blue": "#263d58", //#2D4561
      pink: "#fe8084", //#F97B7F
      "dark-pink": "#B16476",
      blue: "#71ABEF",
      gray: "#aeb6bd",
    },
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
      serif: ["Macherie", "serif"],
    },
    extend: {
      gridTemplateColumns: {
        autofit: "repeat(auto-fit, minmax(160px, 1fr))",
      },
      gridTemplateRows: {
        evenHeight: "repeat(2, 1fr)",
      },
      fontSize: {
        "4xl-res": "clamp(1rem, 0.9163rem + 1.4239vw, 2.625rem)",
        "5xl-res": "clamp(2rem, 1.6663rem + 1.4239vw, 3.375rem)",
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(.49,.19,.32,1)",
      },
      typography: ({ theme }) => ({
        pink: {
          css: {
            // Colors
            "--tw-prose-body": theme("colors.pink"),
            "--tw-prose-headings": theme("colors.pink"),
            "--tw-prose-bold": theme("colors.pink"),
            "--tw-prose-links": theme("colors.blue"),
            "--tw-prose-bullets": theme("colors.pink"),
            "--tw-prose-code": theme("colors.blue"),
            "--tw-prose-hr": theme("colors.pink"),
            "--tw-prose-quotes": theme("colors.blue"),
            "--tw-prose-quote-borders": theme("colors.blue"),
            "--tw-prose-th-borders": theme("colors.blue"),
            "--tw-prose-td-borders": theme("colors.blue"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
