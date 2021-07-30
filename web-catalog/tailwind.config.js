module.exports = {
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          background: "#e2e8ed",
          dark: "#5a5a5a",
          light: "#d9d9d9",
        },
        purple: {
          main: "#c028b9",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
