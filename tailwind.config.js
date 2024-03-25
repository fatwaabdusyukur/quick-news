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
        loading: {
          from: {
            transform:
              "translate(0px, 0px) rotate(0deg) translateX(40px) rotate(0deg)",
          },
          to: {
            transform:
              "translate(0px, 0px) rotate(360deg) translateX(40px) rotate(-360deg)",
          },
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
