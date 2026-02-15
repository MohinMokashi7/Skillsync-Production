/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#FBBF24",
        background: "#F8FAFC",
        textDark: "#1E293B",
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
}
