/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/*.{js,jsx,ts,tsx}", "./src/components/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        purple: {
          base: "#7C3AED",
          light: "#EDE9FE",
        },
        gray: {
          400: "#F8FAFC", 
          300: "#94A3B8",
          200: "#334155",
          100: "#0F172A", 
          90: "#1a1a1a",
          80: "#030303"
        },
      },
      fontFamily: {
        regular: "Inter_400Regular",
        bold: "Inter_600SemiBold",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "24px"
      },
    },
  },
  plugins: [],
};
