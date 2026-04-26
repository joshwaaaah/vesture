import { palette } from './constants/palette';
import type { Config } from 'tailwindcss';

const config: Config = {
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
        grey: palette.grey,
        lime: palette.lime,
        surface: {
          primary: {
            background: palette.grey[0],
            foreground: palette.grey[900],
            'foreground-secondary': palette.grey[500],
            border: palette.grey[200],
            accent: palette.lime[300],
          },
          secondary: {
            background: palette.grey[100],
            foreground: palette.grey[700],
            'foreground-secondary': palette.grey[500],
            border: palette.grey[200],
            accent: palette.lime[300],
          },
          inverted: {
            background: palette.grey[1000],
            foreground: palette.grey[0],
            'foreground-secondary': palette.grey[400],
            border: palette.grey[800],
            accent: palette.lime[300],
          },
        },
        button: {
          background: palette.grey[1000],
          foreground: palette.grey[0],
        },
        pill: {
          background: palette.grey[0],
          foreground: palette.grey[1000],
          border: palette.grey[200],
          selected: {
            background: palette.grey[1000],
            foreground: palette.grey[0],
            border: palette.grey[1000],
          },
        },
        input: {
          border: palette.grey[200],
          placeholder: palette.grey[500],
        },
        'wardrobe-item': {
          background: palette.grey[0],
          border: palette.grey[200],
          placeholder: palette.grey[100],
          foreground: palette.grey[900],
          'foreground-secondary': palette.grey[500],
          price: palette.grey[700],
        },
      },
    },
  },
  plugins: [],
};

export default config;
