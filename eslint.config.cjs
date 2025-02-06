const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // This is for Node.js environment
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn', // example backend rule
    },
  },
];
