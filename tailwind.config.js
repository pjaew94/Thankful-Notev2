module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'false', // or 'media' or 'class'
  theme: {
    fontFamily: {
      kor: ['Gothic A1', "sans-serif"],
      sans: ["Helvetica", 'sans-serif'],
      serif: ["Shapiro", "sans-serif"]
    },
    extend: {
      colors: {
        "spaceBlack": "#18171E"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
