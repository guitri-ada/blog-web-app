import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node, // Node.js global variables
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn', // Warn if using console.log
      'no-unused-vars': 'warn', // Warn for unused variables
      'strict': ['error', 'global'], // Enforce "use strict"
    },
  },
];
