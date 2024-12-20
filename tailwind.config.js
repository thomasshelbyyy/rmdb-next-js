/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "my-primary": "#000000",
        "my-secondary": "#121212",
        "my-tercary": "#1A1A1A",
        "my-accent": "#F5C515",
        "my-text": "#357AE0"
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ],
};
