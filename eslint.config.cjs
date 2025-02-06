const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
