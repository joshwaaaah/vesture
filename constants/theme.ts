import { Platform } from 'react-native';
import { palette } from '@/constants/palette';

export const tokens = {
  surface: {
    primary: {
      background: palette.grey[0],
      foreground: palette.grey[900],
      foregroundSecondary: palette.grey[500],
      border: palette.grey[200],
      accent: palette.lime[300],
    },
    secondary: {
      background: palette.grey[100],
      foreground: palette.grey[700],
      foregroundSecondary: palette.grey[500],
      border: palette.grey[200],
      accent: palette.lime[300],
    },
    inverted: {
      background: palette.grey[1000],
      foreground: palette.grey[0],
      foregroundSecondary: palette.grey[400],
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
  wardrobeItem: {
    background: palette.grey[0],
    border: palette.grey[200],
    placeholderBackground: palette.grey[100],
    placeholderForeground: palette.grey[400],
    placeholderBackgroundSecondary: palette.grey[200],
    foreground: palette.grey[900],
    foregroundSecondary: palette.grey[500],
    price: palette.grey[700],
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
