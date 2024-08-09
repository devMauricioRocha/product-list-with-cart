/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html, js}",
    "src/*.js"
  ],
  theme: {
    fontFamily: {
      sans: ["Red Hat Text", "sans-serif"]
    },
    fontWeight: {
      normal: "400",
      semi_bold: "600",
      bold: "700"
    },
    colors: {
      red: "hsl(14, 86%, 42%)",
      red2:"hsl(14, 96%, 27%)",
      green: "hsl(159, 69%, 38%)",
      fundoCard: "hsl(0deg 0% 0% / 29%)",
      
      rose: {
        50: "hsl(20, 50%, 98%)",
        100: "hsl(13, 31%, 94%)",
        300: "hsl(14, 25%, 72%)",
        400: "hsl(7, 20%, 60%)",
        500: "hsl(12, 20%, 44%)",
        900: "hsl(14, 65%, 9%)",
      }

    },
  },
  plugins: [],
}

