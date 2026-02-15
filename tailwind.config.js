/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'eb-garamond-400': 'EBGaramond_400Regular',
        'eb-garamond-500': 'EBGaramond_500Medium',
        'eb-garamond-700': 'EBGaramond_700Bold',
      },
    },
  },
  plugins: [],
};
