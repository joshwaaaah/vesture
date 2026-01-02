// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintConfigPrettier = require("eslint-config-prettier");
const eslintPluginPrettier = require("eslint-plugin-prettier");
const prettierConfig = require("./.prettierrc");

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier, // Disables ESLint rules that conflict with Prettier
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error", prettierConfig],
    },
  },
  {
    ignores: ["dist/*"],
  },
]);
