const { grey, lime } = require('./constants/palette');

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
        'manrope-400': 'Manrope_400Regular',
        'manrope-500': 'Manrope_500Medium',
        'manrope-600': 'Manrope_600SemiBold',
      },
      colors: {
        grey,
        lime,
        surface: {
          primary: {
            background:        grey[0],
            foreground:        grey[900],
            'foreground-secondary': grey[500],
            border:            grey[200],
            accent:            lime[300],
          },
          secondary: {
            background:        grey[100],
            foreground:        grey[700],
            'foreground-secondary': grey[500],
            border:            grey[200],
            accent:            lime[300],
          },
          inverted: {
            background:        grey[1000],
            foreground:        grey[0],
            'foreground-secondary': grey[400],
            border:            grey[800],
            accent:            lime[300],
          },
        },
        button: {
          background: grey[1000],
          foreground: grey[0],
        },
        pill: {
          background: grey[0],
          foreground: grey[1000],
          border:     grey[200],
          selected: {
            background: grey[1000],
            foreground: grey[0],
            border:     grey[1000],
          },
        },
        input: {
          border:      grey[200],
          placeholder: grey[500],
        },
        'wardrobe-item': {
          background:             grey[0],
          border:                 grey[200],
          placeholder:            grey[100],
          foreground:             grey[900],
          'foreground-secondary': grey[500],
          price:                  grey[700],
        },
      },
    },
  },
  plugins: [],
};
