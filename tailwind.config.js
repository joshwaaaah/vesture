/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'manrope-300': 'Manrope_300Light',
        'manrope-400': 'Manrope_400Regular',
        'manrope-500': 'Manrope_500Medium',
        'manrope-600': 'Manrope_600SemiBold',
      }
    },
  },
  plugins: [],
}

