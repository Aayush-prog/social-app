const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        lurple: "#8280FF",
        customgray: "#F9F6FA",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
