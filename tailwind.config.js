module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'false', // or 'media' or 'class'
  theme: {
    fontFamily: {
      kor: ['Gothic A1', "sans-serif"],
      sans: ["Associate Sans", 'sans-serif'],
      serif: ["Touche", "sans-serif"]
    },
    extend: {
      colors: {
        "spaceBlack": "#18171E",
        "black": "#111111",
        "sunnyYellow": "#F7E353"
      }
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}
