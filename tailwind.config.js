/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        turn: {
          from: { transform: "rotate(0)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
    fontFamily: {
      marcellus: "marcellus",
      roboto: "roboto",
    },
  },
  plugins: [],
};
