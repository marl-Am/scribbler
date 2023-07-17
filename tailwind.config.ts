import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    // lofi is defalt theme, dark will be default dark mode theme
    themes: ["lofi"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
