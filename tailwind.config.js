/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      container: {
        center: true,
      },

      borderRadius: {
        "5xl": "5rem",
      },

    },
  },
  plugins: [require("flowbite/plugin")],
};
