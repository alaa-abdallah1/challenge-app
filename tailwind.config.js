export default {
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        error: "#ef4444",
        theme: {
          DEFAULT: "#e5e7eb",
          dark: "#1f2937",
        },
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};
