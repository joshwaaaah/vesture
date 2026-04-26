import { palette } from './palette';

export const colors = {
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
    'placeholder-background': palette.grey[100],
    'placeholder-foreground': palette.grey[700],
    'placeholder-background-secondary': palette.grey[200],
    skeleton: {
      from: palette.grey[100],
      via: palette.grey[200],
      to: palette.grey[100],
    },
    foreground: palette.grey[900],
    'foreground-secondary': palette.grey[500],
    price: palette.grey[700],
  },
} as const;
