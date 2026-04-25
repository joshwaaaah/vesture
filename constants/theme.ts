import { Platform } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { grey, lime } = require('./palette') as {
  grey: Record<number, string>;
  lime: Record<number, string>;
};

export const tokens = {
  surface: {
    primary: {
      background:         grey[0],
      foreground:         grey[900],
      foregroundSecondary: grey[500],
      border:             grey[200],
      accent:             lime[300],
    },
    secondary: {
      background:         grey[100],
      foreground:         grey[700],
      foregroundSecondary: grey[500],
      border:             grey[200],
      accent:             lime[300],
    },
    inverted: {
      background:         grey[1000],
      foreground:         grey[0],
      foregroundSecondary: grey[400],
      border:             grey[800],
      accent:             lime[300],
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
  wardrobeItem: {
    background:         grey[0],
    border:             grey[200],
    placeholder:        grey[100],
    foreground:         grey[900],
    foregroundSecondary: grey[500],
    price:              grey[700],
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
